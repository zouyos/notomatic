import { NoteForm } from 'components/NoteForm/NoteForm';
import { NoteAPI } from 'api/note-api';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from 'store/note/note-slice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function CreateNote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((store) => store.AUTH.loggedIn);
  const [errors, setErrors] = useState([]);

  async function createNote(formValues) {
    try {
      const createdNote = await NoteAPI.create({
        ...formValues,
        created_at: new Date().toLocaleDateString(),
      });

      dispatch(addNote(createdNote));
      navigate('/');
      setErrors([]);
    } catch (errs) {
      setErrors(errs.response.data.errors);
    }
  }

  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
    }
  }, [loggedIn]);

  return (
    <NoteForm
      title='Create a note'
      onSubmit={createNote}
      buttonLabel='Create'
      errors={errors}
    />
  );
}
