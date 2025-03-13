import { NoteAPI } from '../../api/note-api';
import { UserForm } from '../../components/UserForm/UserForm';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLoggedIn } from '../../store/auth/auth-slice';
import { User } from 'src/types/types';

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState([]);

  async function login(formValues: User) {
    const { repeatPassword, ...rest } = formValues;
    try {
      await NoteAPI.login(rest);
      dispatch(setLoggedIn(true));
      localStorage.setItem('loggedIn', JSON.stringify(true));
      navigate('/');
    } catch (errs: any) {
      setServerErrors(errs.response?.data?.errors || [errs.message]);
      console.error(errs);
    }
  }

  return (
    <>
      <UserForm onSubmit={login} serverErrors={serverErrors} />
      <div>
        <div className='d-flex justify-content-center text-center'>
          <Link to='/reset-password'>Forgot password?</Link>
        </div>
      </div>
    </>
  );
}
