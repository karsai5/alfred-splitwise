import Splitwise from 'splitwise';
import * as dotenv from 'dotenv';

dotenv.config();

const main = async () => {
  console.log('hello!');
  const sw = Splitwise({
    consumerKey: process.env.SPLITWISE_KEY,
    consumerSecret: process.env.SPLITWISE_SECRET
  })

  // sw.getCurrentUser().then((user) => console.log(user));
  const groups = await sw.getGroups();
  console.log(groups);
}

main();
