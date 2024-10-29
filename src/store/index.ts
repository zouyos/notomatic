import { configureStore } from "@reduxjs/toolkit";
import { noteSlice } from "./note/note-slice";
import { authSlice } from "./auth/auth-slice";

export const store = configureStore({
  reducer: {
    NOTE: noteSlice.reducer,
    AUTH: authSlice.reducer,
  },
});
