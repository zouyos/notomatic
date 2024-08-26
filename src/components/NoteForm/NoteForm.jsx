import { ButtonPrimary } from 'components/ButtonPrimary/ButtonPrimary';
import style from './style.module.css';
import {
  PencilFill,
  TrashFill,
  ArrowCounterclockwise,
} from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import { ValidatorService } from 'services/form-validators';
import { FieldError } from 'components/FieldError/FieldError';
import he from 'he';

const VALIDATORS = {
  title: (value) => {
    return ValidatorService.min(value, 3) || ValidatorService.max(value, 50);
  },
  content: (value) => {
    return ValidatorService.min(value, 3) || ValidatorService.max(value, 5000);
  },
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
}) {
  const decodedContent = he.decode(note?.content);
  const [formValues, setFormValues] = useState({
    title: note?.title || '',
    content: decodedContent || '',
  });
  const [formErrors, setFormErrors] = useState({
    title: note?.title ? undefined : '',
    content: note?.content ? undefined : '',
  });
  const [serverErrors, setServerErrors] = useState({
    title: errors.find((err) => err.path === 'title')?.msg,
    content: errors.find((err) => err.path === 'content')?.msg,
  });

  function validate(fieldName, fieldValue) {
    setFormErrors({
      ...formErrors,
      [fieldName]: VALIDATORS[fieldName](fieldValue),
    });
  }

  function updateFormValues(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    validate(e.target.name, e.target.value);
  }

  function hasErrors() {
    return Object.values(formErrors).some((error) => error !== undefined);
  }

  useEffect(() => {
    setServerErrors({
      title: errors.find((err) => err.path === 'title')?.msg,
      content: errors.find((err) => err.path === 'content')?.msg,
    });
  }, [errors]);

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
        type='text'
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
      <ButtonPrimary
        onClick={(e) => {
          e.preventDefault();
          onSubmit(formValues);
        }}
        disabled={hasErrors()}
      >
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

  return (
    <form className={style.container}>
      <div className='d-flex justify-content-between flex-wrap'>
        <h2 className='mb-2 text-break'>{title}</h2>
        {actionIcons}
      </div>
      <div className={style.title_input}>{isEditable && titleInput}</div>
      {isEditable ? (
        contentInput
      ) : (
        <pre className={style.content}>{decodedContent}</pre>
      )}
      {onSubmit && submitButton}
      {note && !isEditable && (
        <div>
          <hr />
          <div className={style.note_footer}>
            Created at {note.created_at}
            {note.modified_at && <span> | Modified at {note.modified_at}</span>}
          </div>
        </div>
      )}
    </form>
  );
}
