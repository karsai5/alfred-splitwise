import Splitwise from 'splitwise';
import * as dotenv from 'dotenv';

dotenv.config();

export const SplitwiseGroup = () => {
  const sw = Splitwise({
    consumerKey: process.env.SPLITWISE_KEY,
    consumerSecret: process.env.SPLITWISE_SECRET
  })
  const getGroups = async () => {
    const groups = await sw.getGroups();
    return groups;
  }

  return {
    getGroups,
  }
}

export const getGroups = () => {
  const sw = Splitwise({
    consumerKey: process.env.SPLITWISE_KEY,
    consumerSecret: process.env.SPLITWISE_SECRET
  })
  return sw.getGroups();
}
