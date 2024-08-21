import { SearchBar } from "components/SearchBar/SearchBar";
import { NoteList } from "containers/NoteList/NoteList";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function BrowseNotes() {
  const [searchText, setSearchText] = useState("");
  const noteList = useSelector((store) => store.NOTE.noteList);
  const filteredNoteList = noteList.filter((note) => {
    const containsTitle = note.title
      .toUpperCase()
      .includes(searchText.trim().toUpperCase());
    const containsContent = note.content
      .toUpperCase()
      .includes(searchText.trim().toUpperCase());
    return containsTitle || containsContent;
  });
  const loggedIn = useSelector((store) => store.AUTH.loggedIn);

  return (
    <>
      {loggedIn ? (
        <div>
          <div className="row justify-content-center mb-5">
            <div className="col-sm-12 col-md-4">
              <SearchBar
                placeholder="Search your notes..."
                onTextChange={setSearchText}
              />
            </div>
          </div>
          {noteList?.length === 0 && (
            <div className="d-flex justify-content-center text-center">
              <span>
                You don't have notes yet, would you like to{" "}
                <Link to="/note/new">create one</Link>?
              </span>
            </div>
          )}
          <NoteList noteList={filteredNoteList} />
        </div>
      ) : (
        <div className="d-flex justify-content-center text-center">
          <span>
            Please <Link to="/signup">sign up</Link> or{" "}
            <Link to="/login">login</Link> to use Notomatic
          </span>
        </div>
      )}
    </>
  );
}
