import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { App } from "App";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageNotFound } from "pages/PageNotFound/PageNotFound";
import { BrowseNotes } from "pages/BrowseNotes/BrowseNotes";
import { Note } from "pages/Note/Note";
import { CreateNote } from "pages/CreateNote/CreateNote";
import { Signup } from "pages/Signup/Signup";
import { Login } from "pages/Login/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<BrowseNotes />} />
            <Route path="note/new" element={<CreateNote />} />
            <Route path="/note/:noteId" element={<Note />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
