import { type Note } from "../../types/types";
import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "noteSlice",
  initialState: {
    noteList: [] as Note[],
  },
  reducers: {
    setNoteList: (currentSlice, action) => {
      currentSlice.noteList = action.payload;
    },
    addNote: (currentSlice, action) => {
      if (action.payload) {

        currentSlice.noteList.push(action.payload);
      }
    },
    updateNote: (currentSlice, action) => {
      const indexToUpdate = currentSlice.noteList.findIndex(
        (note: Note) => note.id === action.payload.id
      );
      currentSlice.noteList[indexToUpdate] = action.payload;
    },
    deleteNote: (currentSlice, action) => {
      const filteredNoteList = currentSlice.noteList.filter(
        (note) => note.id !== action.payload
      );
      currentSlice.noteList = filteredNoteList;
    },
  },
});

export const { setNoteList, addNote, updateNote, deleteNote } =
  noteSlice.actions;
