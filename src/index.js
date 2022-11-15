import { getGroupsInAlfredFormat } from './alfredHelper';


const main = async () => {
  const groups = await getGroupsInAlfredFormat();
  console.log({ groups });
}

main();


