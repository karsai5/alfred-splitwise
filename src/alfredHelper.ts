import { getCurrentUser, getGroup, getGroups } from './splitwiseHelper.js';
import fs from 'fs';
import https from 'https';
import { Group, MembersEntity } from './types.js';
import { log } from 'console';

const GROUP_ICONS_PATH = './group-icons';
const getGroupIcon = (group: Group) => `${GROUP_ICONS_PATH}/${group.id}.png`

const downloadGroupIcon = (group: Group) => {
  const filePath = getGroupIcon(group);
  if (!fs.existsSync(GROUP_ICONS_PATH)) fs.mkdirSync(GROUP_ICONS_PATH, '0777');
  if (fs.existsSync(filePath)) {
    return;
  }
  const file = fs.createWriteStream(filePath);
  https.get(group.avatar.large, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
    })
  })
};

const getMemberName = (member: MembersEntity) => `${member.first_name || ''} ${member.last_name || ''}`.trim();

const getGroupId = () => {
  const groupId = process.env.groupId;
  if (!groupId) {
    throw new Error("Group not selected, do that first");
  }
  return groupId;
}

export const getGroupsInAlfredFormat = async () => {
  const groups = await getGroups();
  const mappedGroups =
    groups.filter(g => g.id !== 0).map(g => {
      downloadGroupIcon(g);
      return ({
        uid: g.id,
        title: g.name,
        arg: g.id,
        valid: true,
        subtitle: g.members.map(m => getMemberName(m)).join(', '),
        icon: {
          path: getGroupIcon(g),
        },
      });
    });

  return mappedGroups;
}

const getMemberNameFromId = (group: Group, memberId: number) => {
  const member = group.members.find(m => m.id === memberId);
  if (!member) {
    return "unknown";
  }
  return getMemberName(member);
}

const getCurrencySymbol = (currency: string) => {
  return (0).toLocaleString(
    'EN-au',
    {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  ).replace(/\d/g, '').trim()
}


export const getDebtsInAlfredFormat = async (query?: string) => {
  if (query) {
    return handleAddingDebt(query);
  }
  const group = await getGroup(getGroupId());
  const me = await getCurrentUser();
  const whichDebts = group.simplify_by_default ? 'simplified_debts' : 'original_debts';
  return group[whichDebts]
    .filter(d => d.from === me.id || d.to === me.id)
    .map(d => {
      return {
        // title: d.amount,
        title: `${getCurrencySymbol(d.currency_code)}${d.amount}`,
        subtitle: `${getMemberNameFromId(group, d.from)} -> ${getMemberNameFromId(group, d.to)}`,
      }
    });
};

const handleAddingDebt = (query: string) => {
  const re = /^\d*(\.\d*)? \D*$/;
  if (!re.test(query.trim())) {
    return [{
      title: 'Adding debt to the group',
      subtitle: 'e.g. 20.50 for groceries',
    }]
  }
  const description = query.slice(query.indexOf(' ') + 1);
  const amount = query.slice(0, query.indexOf(' '));
  return [{
    title: `Add an expense of $${amount} for "${description}"`,
  }]
}
