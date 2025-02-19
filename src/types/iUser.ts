import { iNote } from './iNote';

export type iUser = {
  _id?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  createdAt?: string;
  notes?: iNote[] | null;
};
