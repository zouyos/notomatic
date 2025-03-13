import { NoteForm } from '../../components/NoteForm/NoteForm';
import { NoteAPI } from '../../api/note-api';
import { useDispatch } from 'react-redux';
import { addNote } from '../../store/note/note-slice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { NoteType } from 'src/types/types';

export function CreateNote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<any>([]);

  async function createNote(formValues: NoteType) {
    try {
      const createdNote = await NoteAPI.create({
        ...formValues,
        created_at: new Date().toLocaleDateString(),
      });

      dispatch(addNote(createdNote));
      navigate('/');
      setErrors([]);
    } catch (errs: any) {
      setErrors(errs.response?.data?.errors || [errs.message]);
      console.error(errs);
    }
  }

  return (
    <NoteForm
      title='Create a note'
      onSubmit={createNote}
      buttonLabel='Create'
      errors={errors}
      note={undefined}
    />
  );
}
