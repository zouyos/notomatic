import { useDispatch } from 'react-redux';
import { TextCard } from '../../components/TextCard/TextCard';
import { useNavigate } from 'react-router-dom';
import { NoteAPI } from '../../api/note-api';
import { deleteNote } from '../../store/note/note-slice';
import { NoteType } from 'src/types/types';

type NoteListProps = {
  noteList: NoteType[];
};

export function NoteList({ noteList }: NoteListProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function removeNote(noteId: string) {
    if (window.confirm('Delete note?')) {
      await NoteAPI.deleteById(noteId);
      dispatch(deleteNote(noteId));
    }
  }

  return (
    <div className='row justify-content-center align-items-center'>
      {noteList?.map((note) => {
        return (
          <TextCard
            key={note.id}
            title={note.title}
            subtitle={note.modified_at ? note.modified_at : note.created_at}
            content={note.content}
            onCardClick={() => navigate(`/note/${note.id}`)}
            onTrashClick={() => removeNote(note.id as string)}
          />
        );
      })}
    </div>
  );
}
