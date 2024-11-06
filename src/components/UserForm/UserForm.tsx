import { ValidatorService } from '../../services/form-validators';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { FieldError } from '../../components/FieldError/FieldError';
import { EnvelopeAt, ShieldLock } from 'react-bootstrap-icons';
import { User } from 'src/types/types';

type UserFormProps = {
  signup?: boolean;
  requestPwd?: boolean;
  resetPwd?: boolean;
  onSubmit: (formValues: User) => void;
  serverErrors: any;
};

export function UserForm({
  signup,
  requestPwd,
  resetPwd,
  onSubmit,
  serverErrors,
}: UserFormProps) {
  const VALIDATORS: any = {
    email: (value: string) => {
      return (
        ValidatorService.min(value, 3) || ValidatorService.emailRegex(value)
      );
    },
    password: (value: string) => {
      return (
        !requestPwd &&
        (ValidatorService.min(value, 6) ||
          ValidatorService.max(value, 30) ||
          ValidatorService.passwordRegex(value) ||
          (signup &&
            ValidatorService.notSame(value, formValues.repeatPassword)))
      );
    },
    repeatPassword: (value: string) => {
      return signup && ValidatorService.notSame(value, formValues.password);
    },
  };

  const [formValues, setFormValues] = useState<any>({
    email: '',
    password: !requestPwd && '',
    repeatPassword: signup && '',
  });

  const [formErrors, setFormErrors] = useState<any>({
    email: '',
    password: requestPwd ? undefined : '',
    repeatPassword: signup && '',
  });

  function validate(fieldName: string, fieldValue: string) {
    setFormErrors({
      ...formErrors,
      [fieldName]: VALIDATORS[fieldName](fieldValue),
    });
  }

  function updateFormValues(e: React.FormEvent<HTMLInputElement>) {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormValues({ ...formValues, [name]: value });
    validate(name, value);
  }

  function hasErrors() {
    return Object.values(formErrors).some((err) => err !== undefined);
  }

  useEffect(() => {
    validate('password', formValues.password);
  }, [formValues.repeatPassword]);

  useEffect(() => {
    validate('repeatPassword', formValues.repeatPassword);
  }, [formValues.password]);

  function generateTitle() {
    switch (true) {
      case signup:
        return 'Sign Up';
      case requestPwd:
        return 'Request Password Reset';
      case resetPwd:
        return 'Password Reset';
      default:
        return 'Login';
    }
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-md-6 col-sm-12'>
        <h2>{generateTitle()}</h2>
        <form
          className={`form-control my-4 border border-primary ${style.form}`}
        >
          <div className='mb-3'>
            <EnvelopeAt size={20} color='#b8b8b8' className='mb-1 me-2' />
            <label htmlFor='email' className='my-2'>
              Email
            </label>
            <input
              type='text'
              name='email'
              value={formValues.email}
              onChange={updateFormValues}
              className='form-control'
            />
            <FieldError msg={formErrors.email} />
          </div>
          {!requestPwd && (
            <div className='mb-3'>
              <ShieldLock size={20} color='#b8b8b8' className='mb-1 me-2' />
              <label htmlFor='password' className='my-2'>
                Password
              </label>
              <input
                type='password'
                name='password'
                value={formValues.password}
                onChange={updateFormValues}
                className='form-control'
              />
              <FieldError msg={formErrors.password} />
            </div>
          )}
          {signup && (
            <div className='mb-3'>
              <ShieldLock size={20} color='#b8b8b8' className='mb-1 me-2' />
              <label htmlFor='repeatPassword' className='my-2'>
                Repeat Password
              </label>
              <input
                type='password'
                name='repeatPassword'
                className='form-control'
                value={formValues.repeatPassword}
                onChange={updateFormValues}
              />
              <FieldError msg={formErrors.repeatPassword} />
            </div>
          )}
          <button
            className={`btn btn-primary mt-3 mb-2 rounded-pill ${style.button}`}
            onClick={(e) => {
              e.preventDefault();
              onSubmit(formValues);
            }}
            disabled={hasErrors()}
          >
            Submit
          </button>
        </form>
        {serverErrors.message ? (
          <FieldError msg={serverErrors.message} />
        ) : (
          <ul>
            {serverErrors.errors?.map((err: any, i: number) => (
              <li key={i}>
                <FieldError msg={err.msg} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
