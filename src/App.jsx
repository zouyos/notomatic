import { NoteAPI } from "api/note-api";
import { Header } from "components/Header/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setNoteList } from "store/note/note-slice";
import style from "./style.module.css";

export function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((store) => store.AUTH.loggedIn);

  async function fetchAllNotes() {
    const noteList = await NoteAPI.fetchAll();
    dispatch(setNoteList(noteList));
  }

  useEffect(() => {
    if (loggedIn) {
      fetchAllNotes();
    }
  }, [loggedIn]);

  return (
    <div className="container-fluid">
      <Header />
      <div className={style.outlet_container}>
        <Outlet />
      </div>
    </div>
  );
}
