import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    loggedIn: Cookies.get("token"),
    serverErrors: [],
  },
  reducers: {
    setLoggedIn: (currentSlice, action) => {
      currentSlice.loggedIn = action.payload;
    },
    setServerErrors: (currentSlice, action) => {
      currentSlice.serverErrors = action.payload;
    },
  },
});

export const { setLoggedIn, setServerErrors } = authSlice.actions;
