import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    logOut: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    },
  },
});

export const { logOut, setUser } = authSlice.actions;
export default authSlice.reducer;
