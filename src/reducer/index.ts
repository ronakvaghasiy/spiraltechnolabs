import { createSlice } from "@reduxjs/toolkit";
import { User } from "../type";

const initialState: User = { user: { writer: "", password: "" } };

const authSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: (state, actions) => {
      state.user = actions.payload;
    },
    login: (state, actions) => {
      state.user = actions.payload;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
