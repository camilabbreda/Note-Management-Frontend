import { iNote } from '@/types/iNote';
import { iUser } from '@/types/iUser';

export const INITIAL_USER_STATE: iUser = {
  _id: '',
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  createdAt: '',
  notes: null,
};

export const INITIAL_NOTE_STATE: iNote = {
  _id: '',
  title: '',
  content: '',
  userId: '',
};
