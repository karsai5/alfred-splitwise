import { getGroupsInAlfredFormat } from './alfredHelper.js';
import { getGroups } from './splitwiseHelper.js';


const main = async () => {
  const groups = await getGroups();
  console.log(groups.map(g => g.simplified_debts));
}

main();


