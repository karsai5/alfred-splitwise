import alfy from 'alfy';
import { getDebtsInAlfredFormat, getGroupsInAlfredFormat } from './alfredHelper.js';

const COMMANDS = {
  groups: "GROUPS",
  debts: "DEBTS"
}

const main = async () => {
  const command = process.argv[2];
  const query = process.argv?.[3];

  switch (command) {
    case COMMANDS.groups:
      const groups = await getGroupsInAlfredFormat();
      alfy.output(groups as any);
      return;
    case COMMANDS.debts:
      const debts = await getDebtsInAlfredFormat(query);
      alfy.output(debts as any);
      return;
    default:
      throw new Error(`Command does not exist: ${command}`);
  }
};

main();
