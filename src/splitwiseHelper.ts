import Splitwise from 'splitwise';
import * as dotenv from 'dotenv';
import { Group, User } from './types.js';

dotenv.config();

const sw = Splitwise({
  consumerKey: process.env.SPLITWISE_KEY,
  consumerSecret: process.env.SPLITWISE_SECRET
})

export const SplitwiseGroup = () => {
  const getGroups = async () => {
    const groups = await sw.getGroups();
    return groups;
  }

  return {
    getGroups,
  }
}

export const getGroups = () => {
  return sw.getGroups() as Promise<Array<Group>>;
}

export const getGroup = (groupId: string) => {
  return sw.getGroup({ id: groupId }) as Promise<Group>;
}

export const getCurrentUser = () => {
  return sw.getCurrentUser() as Promise<User>;
}
