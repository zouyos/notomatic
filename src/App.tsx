import { NoteAPI } from './api/note-api';
import { Header } from './components/Header/Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { setNoteList } from './store/note/note-slice';
import style from './style.module.css';
import { NoteType } from './types/types';

export function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((store: any) => store.AUTH.loggedIn);

  async function fetchAllNotes() {
    const noteList: NoteType[] = await NoteAPI.fetchAll();
    dispatch(setNoteList(noteList));
  }

  useEffect(() => {
    const storedLoggedIn: boolean | null = JSON.parse(
      localStorage.getItem('loggedIn')
    );
    if (loggedIn || storedLoggedIn) {
      fetchAllNotes();
    }
  }, [loggedIn]);

  return (
    <div className='container-fluid'>
      <Header />
      <div className={style.outlet_container}>
        <Outlet />
      </div>
    </div>
  );
}
