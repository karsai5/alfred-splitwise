import { getGroups } from './splitwiseHelper';
import fs from 'fs';

const GROUP_ICONS_PATH = './group-icons';
const getGroupIcon = (group) => `${GROUP_ICONS_PATH}/${group.id}.png`

const downloadGroupIcon = (group) => {
  const filePath = getGroupIcon(group);
  if (!fs.existsSync(GROUP_ICONS_PATH)) fs.mkdirSync(GROUP_ICONS_PATH, '0777', true);
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

const getMemberName = member => `${member.first_name || ''} ${member.last_name || ''}`.trim();

export const getGroupsInAlfredFormat = async () => {
  const groups = await getGroups();
  const mappedGroups =
    groups.filter(g => g.id !== 0).map(g => {
      downloadGroupIcon(g);
      return ({
        uid: g.id,
        title: g.name,
        action: 'test',
        valid: true,
        subtitle: g.members.map(m => getMemberName(m)).join(', '),
        icon: {
          path: getGroupIcon(g),
        },
      });
    });

  return mappedGroups;
}
