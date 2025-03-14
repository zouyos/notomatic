import { User } from 'src/types/types';
import { NoteAPI } from '../../api/note-api';
import { UserForm } from '../../components/UserForm/UserForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Signup() {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState([]);

  async function signup(formValues: User) {
    try {
      await NoteAPI.signup(formValues);
      navigate('/login');
    } catch (errs: any) {
      setServerErrors(errs.response?.data?.errors || [errs.message]);
      console.error(errs);
    }
  }

  return <UserForm signup onSubmit={signup} serverErrors={serverErrors} />;
}
