import { User } from 'src/types/types';
import { NoteAPI } from '../../api/note-api';
import { UserForm } from '../../components/UserForm/UserForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RequestPasswordReset() {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState([]);

  async function requestPasswordReset(formValues: User) {
    try {
      await NoteAPI.requestPasswordReset(formValues.email);
      navigate('/login');
    } catch (errs: any) {
      setServerErrors(errs.response?.data?.errors || [errs.message]);
      console.error(errs);
    }
  }

  return (
    <UserForm
      requestPwd
      onSubmit={requestPasswordReset}
      serverErrors={serverErrors}
    />
  );
}
