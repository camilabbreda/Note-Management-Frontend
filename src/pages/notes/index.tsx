// pages/notes.js
import NotesList from '@/components/Notes/notes-list';
import { useAuth } from '@/context/auth-context';
import NotesProvider from '@/context/notes-context';

const NotesPage = () => {
  const { token, user } = useAuth();
  return (
    <NotesProvider token={token} user={user}>
      {token ? <NotesList /> : 'Loading...'}
    </NotesProvider>
  );
};

export default NotesPage;
