import { ButtonPrimary } from '../../components/ButtonPrimary/ButtonPrimary';
import style from './style.module.css';
import {
  PencilFill,
  TrashFill,
  ArrowCounterclockwise,
} from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import { ValidatorService } from '../../services/form-validators';
import { FieldError } from '../../components/FieldError/FieldError';
import he from 'he';
import { NoteType } from 'src/types/types';

const VALIDATORS: any = {
  title: (value: string) => {
    return ValidatorService.min(value, 3) || ValidatorService.max(value, 50);
  },
  content: (value: string) => {
    return ValidatorService.min(value, 3) || ValidatorService.max(value, 5000);
  },
};

type NoteFormProps = {
  isEditable?: boolean;
  title: string;
  note?: NoteType;
  onEditClick?: undefined | (() => void);
  onTrashClick?: undefined | (() => void);
  onSubmit: null | ((formValues: any) => void);
  buttonLabel?: string;
  errors?: any[];
};

export function NoteForm({
  isEditable = true,
  title,
  note,
  onSubmit,
  onEditClick,
  onTrashClick,
  buttonLabel,
  errors,
}: NoteFormProps) {
  const [formValues, setFormValues] = useState({
    title: note ? he.decode(note.title) : '',
    content: note ? he.decode(note.content) : '',
  });
  const [formErrors, setFormErrors] = useState({
    title: note?.title ? undefined : '',
    content: note?.content ? undefined : '',
  });
  const [serverErrors, setServerErrors] = useState({
    title: errors?.find((err) => err.path === 'title')?.msg,
    content: errors?.find((err) => err.path === 'content')?.msg,
  });

  function validate(fieldName: string, fieldValue: string) {
    setFormErrors({
      ...formErrors,
      [fieldName]: VALIDATORS[fieldName](fieldValue),
    });
  }

  function updateFormValues(
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormValues({ ...formValues, [name]: value });
    validate(name, value);
  }

  function hasErrors() {
    return Object.values(formErrors).some((error) => error !== undefined);
  }

  useEffect(() => {
    setServerErrors({
      title: errors?.find((err) => err.path === 'title')?.msg,
      content: errors?.find((err) => err.path === 'content')?.msg,
    });
  }, [errors]);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit && onSubmit(formValues);
  };

  const titleInput = (
    <div className='mb-4'>
      <label className='form-label'>Title</label>
      <input
        type='text'
        name='title'
        className='form-control'
        value={formValues.title}
        onChange={updateFormValues}
      />
      <FieldError msg={formErrors.title || serverErrors.title} />
    </div>
  );

  const contentInput = (
    <div className='mb-4'>
      <label className='form-label'>Content</label>
      <textarea
        name='content'
        className='form-control'
        rows={12}
        value={formValues.content}
        onChange={updateFormValues}
      />
      <FieldError msg={formErrors.content || serverErrors.content} />
    </div>
  );

  const submitButton = (
    <div className={style.submit_btn}>
      <ButtonPrimary onClick={handleSubmit} disabled={hasErrors()}>
        {buttonLabel}
      </ButtonPrimary>
    </div>
  );

  const actionIcons = (
    <div className='me-3'>
      <span className='me-3'>
        {onEditClick && onSubmit ? (
          <ArrowCounterclockwise className={style.icon} onClick={onEditClick} />
        ) : (
          onEditClick && (
            <PencilFill className={style.icon} onClick={onEditClick} />
          )
        )}
      </span>
      <span>
        {onTrashClick && (
          <TrashFill className={style.icon} onClick={onTrashClick} />
        )}
      </span>
    </div>
  );

  return note ? (
    <form className={style.container}>
      <div className='d-flex justify-content-between flex-wrap'>
        <h2 className='mb-2 text-break'>{title}</h2>
        {actionIcons}
      </div>
      <div className={style.title_input}>{isEditable && titleInput}</div>
      {isEditable ? (
        contentInput
      ) : (
        <pre className={style.content}>{he.decode(note.content)}</pre>
      )}
      {onSubmit && submitButton}
      {!isEditable && (
        <div>
          <hr />
          <div className={style.note_footer}>
            Created at {note.created_at as string}
            {note.modified_at && (
              <span> | Modified at {note.modified_at as string}</span>
            )}
          </div>
        </div>
      )}
    </form>
  ) : (
    <p>No note found</p>
  );
}
