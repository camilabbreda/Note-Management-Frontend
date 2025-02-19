import { createContext, useContext, useEffect, useState } from 'react';
import { iNote } from '@/types/iNote';
import { iUser } from '@/types/iUser';
import registerNoteRequest, {
  deleteNoteRequest,
  generateTitleRequest,
  getAllNotesRequest,
  updateNoteRequest,
} from '@/api/auth/notes-api';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

interface NotesContextType {
  addNote: (note: iNote) => void;
  editNote: (id: string, note: iNote) => void;
  deleteNote: (id: string) => void;
  generateTitle: (content: string) => Promise<string | null>;
  notes: iNote[];
  isLoading: boolean;
}

interface Props {
  children: React.ReactNode;
  user: iUser;
  token: string;
}

const NotesContext = createContext<NotesContextType | null>(null);

export default function NotesProvider({ user, token, children }: Props) {
  const [notes, setNotes] = useState<iNote[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (user && user._id) {
      (async () => {
        await getAllNotes();
      })();
    }
    if (!token) {
      router.push('/login');
    }
  }, [user, token]);

  const getAllNotes = async () => {
    if (user?.notes?.length === 0) return;
    const response = await getAllNotesRequest(user);
    const { success, message } = response;

    if (success) {
      setNotes(message);
    } else {
      Swal.fire({
        title: 'Error!',
        text:
          typeof message === 'string'
            ? message
            : 'Error on requesting user notes, try again later!',
        icon: 'error',
        confirmButtonText: 'Try again!',
      });
    }
  };

  const addNote = async (note: iNote) => {
    note = { ...note, userId: user?._id };
    const response = await registerNoteRequest(note);
    const { success, message } = response;

    if (success) {
      note = { ...note, _id: message._id };
      setNotes([...notes, note]);
      Swal.fire({
        text:
          typeof message === 'string' ? message : 'Note succesfully created!',
        icon: 'success',
        confirmButtonText: 'Cool!',
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text:
          typeof message === 'string'
            ? message
            : 'Error on note creation, try again later!',
        icon: 'error',
        confirmButtonText: 'Try again!',
      });
    }
  };

  const editNote = async (id: string, updatedNote: iNote) => {
    const confirm = await Swal.fire({
      text: 'Are you sure about update this note?',
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      showDenyButton: true,
      icon: 'question',
    });

    if (confirm.isDenied) return;
    const response = await updateNoteRequest(id, updatedNote);
    const { success, message } = response;

    if (success) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, ...updatedNote } : note
        )
      );
      Swal.fire({
        text:
          typeof message === 'string' ? message : 'Note succesfully updated!',
        icon: 'success',
        confirmButtonText: 'Cool!',
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text:
          typeof message === 'string'
            ? message
            : 'Error on note update, try again later!',
        icon: 'error',
        confirmButtonText: 'Try again!',
      });
    }
  };

  const deleteNote = async (id: string) => {
    const confirm = await Swal.fire({
      text: 'Are you sure about delete this note?',
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      showDenyButton: true,
      icon: 'question',
    });

    if (confirm.isDenied) return;
    const response = await deleteNoteRequest(id);
    const { success, message } = response;

    if (success) {
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      Swal.fire({
        text:
          typeof message === 'string' ? message : 'Note succesfully deleted!',
        icon: 'success',
        confirmButtonText: 'Cool!',
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text:
          typeof message === 'string'
            ? message
            : 'Error on note delete note, try again later!',
        icon: 'error',
        confirmButtonText: 'Try again!',
      });
    }
  };

  const generateTitle = async (content: string) => {
    setIsLoading(true);
    const response = await generateTitleRequest(content);

    setIsLoading(false);
    const { success, message } = response;
    if (success) {
      return message;
    } else {
      Swal.fire({
        title: 'Error!',
        text:
          typeof message === 'string'
            ? message
            : 'Error on generating title, try again later!',
        icon: 'error',
        confirmButtonText: 'Try again!',
      });
      return null;
    }
  };

  return (
    <NotesContext.Provider
      value={{ addNote, editNote, deleteNote, notes, isLoading, generateTitle }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNote must be used within an NotesContext');
  }
  return context;
}
