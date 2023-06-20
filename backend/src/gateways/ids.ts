import { customAlphabet, nanoid } from 'nanoid';

export const createGateID = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  6,
);

export const createUserID = () => nanoid();
export const createNominationID = () => nanoid(8);