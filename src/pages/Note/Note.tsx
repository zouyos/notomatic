import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NoteForm } from '../../components/NoteForm/NoteForm';
import { useState } from 'react';
import { deleteNote, updateNote } from '../../store/note/note-slice';
import { NoteAPI } from '../../api/note-api';
import he from 'he';
import { type NoteType } from '../../types/types';

export function Note() {
  const { noteId } = useParams();
  // example usage of usSearchParams
  // const [searchParams] = useSearchParams();
  // const foo = searchParams.get("foo"); // output "bar"

  const dispatch = useDispatch();
  const note = useSelector((store: any) =>
    store.NOTE.noteList.find((note: NoteType) => note.id === noteId)
  );

  const navigate = useNavigate();

  const [isEditable, setIsEditable] = useState(false);
  const [errors, setErrors] = useState<any[]>();

  async function submit(formValues: any) {
    try {
      const updatedNote = await NoteAPI.update({
        ...formValues,
        id: note.id,
        userId: note.userId,
        created_at: note.created_at,
        modified_at: new Date().toLocaleDateString(),
      });
      dispatch(updateNote(updatedNote));
      setIsEditable(false);
      setErrors([]);
    } catch (errs: any) {
      setErrors(errs.response.data.errors);
    }
  }

  async function removeNote(noteId: string) {
    if (window.confirm('Delete note ?')) {
      await NoteAPI.deleteById(noteId);
      dispatch(deleteNote(noteId));
      navigate('/');
    }
  }

  return (
    <>
      {note && (
        <NoteForm
          isEditable={isEditable}
          title={isEditable ? 'Edit note' : he.decode(note.title)}
          note={note}
          onEditClick={() => setIsEditable(!isEditable)}
          onTrashClick={() => removeNote(note.id)}
          onSubmit={isEditable ? submit : null}
          buttonLabel='Edit'
          errors={errors}
        />
      )}
    </>
  );
}
