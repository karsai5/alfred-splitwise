import Splitwise from 'splitwise';
import * as dotenv from 'dotenv';
import alfy from 'alfy';
import fs from 'fs';
import https from 'https';

dotenv.config();

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

const main = async () => {
  // console.log('hello!');
  const sw = Splitwise({
    consumerKey: process.env.SPLITWISE_KEY,
    consumerSecret: process.env.SPLITWISE_SECRET
  })

  // sw.getCurrentUser().then((user) => console.log(user));
  const groups = await sw.getGroups();
  // console.log('groups', groups);
  const mappedGroups = groups.map(g => {
    downloadGroupIcon(g);
    // download icons
    return ({
      uid: g.id,
      title: g.name,
      subtitle: g.members.map(m => `${m.first_name} ${m.last_name}`).join(', '),
      icon: {
        path: getGroupIcon(g),
      },
    });
  });

  alfy.output(mappedGroups)
}

main();


