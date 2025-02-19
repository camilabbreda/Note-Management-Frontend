import style from '../../styles/notes/notesList.module.css';
import { Button, Box, Typography, IconButton, TextField } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useNotes } from '@/context/notes-context';
import { iNote } from '@/types/iNote';
import { useState, useEffect } from 'react';
import { INITIAL_NOTE_STATE } from '@/constants/reset-states';
import Swal from 'sweetalert2';

const NotesList = () => {
  const { notes, addNote, editNote, deleteNote } = useNotes();
  const [newNote, setNewNote] = useState<iNote>({ title: '', content: '' });
  const [editingNote, setEditingNote] = useState<iNote | null>(
    INITIAL_NOTE_STATE
  );

  useEffect(() => {
    if (editingNote) {
      setNewNote({
        title: editingNote.title || '',
        content: editingNote.content || '',
      });
    }
  }, [editingNote]);

  const handleAddNote = () => {
    if (newNote.title && newNote.content) {
      addNote({ _id: '', title: newNote.title, content: newNote.content });
      setNewNote({ title: '', content: '' });
    } else {
      Swal.fire({
        text: 'Please, fill title and content to submit a note.',
        icon: 'warning',
        confirmButtonText: 'Ok!',
      });
    }
  };

  const handleEditNote = (note: iNote) => {
    setEditingNote(note);
  };

  const handleUpdateNote = () => {
    if (editingNote && newNote.title && newNote.content) {
      editNote(editingNote._id as string, { ...editingNote, ...newNote });
      setEditingNote(null);
      setNewNote({ title: '', content: '' });
    }
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
  };

  return (
    <section className={style.container}>
      <Box
        sx={{
          display: 'flex',
          padding: 2,
          background: 'white',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box sx={{ flex: '0 0 35%', padding: 2, minWidth: '320px' }}>
          <Typography variant="h4" gutterBottom>
            {editingNote ? 'Edit Note' : 'Create Note'}
          </Typography>
          <TextField
            label="Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Content"
            value={newNote.content}
            onChange={(e) =>
              setNewNote({ ...newNote, content: e.target.value })
            }
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />
          <Button
            onClick={editingNote?._id ? handleUpdateNote : handleAddNote}
            variant="contained"
            startIcon={<Add />}
          >
            {editingNote?._id ? 'Save Changes' : 'Add Note'}
          </Button>
        </Box>

        <Box sx={{ flex: '0 0 65%', padding: 3, minWidth: '100px' }}>
          <Typography variant="h4" gutterBottom>
            Notes:
          </Typography>
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <Box
                key={note._id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 2,
                  width: '100%',
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography variant="h6">{note.title}</Typography>
                  <Typography>{note.content}</Typography>
                </Box>
                <IconButton onClick={() => handleEditNote(note)}>
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteNote(note._id as string)}
                >
                  <Delete />
                </IconButton>
              </Box>
            ))
          ) : (
            <Typography sx={{ width: '100%' }} variant="h6">
              Any note has been add yet...
            </Typography>
          )}
        </Box>
      </Box>
    </section>
  );
};

export default NotesList;
