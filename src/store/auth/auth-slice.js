import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    loggedIn:
      Cookies.get('token') && JSON.parse(localStorage.getItem('loggedIn')),
    serverErrors: [],
  },
  reducers: {
    setLoggedIn: (currentSlice, action) => {
      currentSlice.loggedIn = action.payload;
      localStorage.setItem('loggedIn', JSON.stringify(action.payload));
    },
    setServerErrors: (currentSlice, action) => {
      currentSlice.serverErrors = action.payload;
    },
  },
});

export const { setLoggedIn, setServerErrors } = authSlice.actions;
export default authSlice.reducer;
