import { NoteAPI } from '../../api/note-api';
import { UserForm } from '../../components/UserForm/UserForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RequestPasswordReset() {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState([]);

  async function requestPasswordReset(formValues: any) {
    const { password, repeatPassword, ...rest } = formValues;
    try {
      await NoteAPI.requestPasswordReset(rest);
      navigate('/login');
    } catch (errs: any) {
      setServerErrors(errs.response.data || errs || errs.message);
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
