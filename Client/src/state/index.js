import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  books: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setBooks: (state, action) => {
      state.books = action.payload.books;
    },
  },
});

export const { setLogin, setLogout, setBooks } = authSlice.actions;
export default authSlice.reducer;
