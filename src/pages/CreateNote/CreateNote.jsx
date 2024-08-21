import { NoteForm } from "components/NoteForm/NoteForm";
import { NoteAPI } from "api/note-api";
import { useDispatch } from "react-redux";
import { addNote } from "store/note/note-slice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function CreateNote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  async function createNote(formValues) {
    try {
      const createdNote = await NoteAPI.create({
        ...formValues,
        created_at: new Date().toLocaleDateString(),
      });
      dispatch(addNote(createdNote));
      navigate("/");
      setErrors([]);
    } catch (errs) {
      setErrors(errs.response.data.errors);
    }
  }

  return (
    <>
      <NoteForm
        title="Create A Note"
        onSubmit={createNote}
        buttonLabel="Create"
        errors={errors}
      />
    </>
  );
}
