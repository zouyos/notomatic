import { NoteAPI } from '../../api/note-api';
import { UserForm } from '../../components/UserForm/UserForm';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function PasswordReset() {
  const navigate = useNavigate();
  const { token } = useParams(); // Extract token from URL
  const [serverErrors, setServerErrors] = useState([]);

  async function reset(formValues: any) {
    try {
      const data = { ...formValues, token };
      await NoteAPI.resetPassword(data);
      navigate('/login');
    } catch (errs: any) {
      setServerErrors(errs.response.data || errs || errs.message);
    }
  }

  return <UserForm resetPwd onSubmit={reset} serverErrors={serverErrors} />;
}
