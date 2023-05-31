import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: null,
};

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setAuthUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      // payload should have 'User' object
      state.current = action.payload;
    },
  },
});

export const { setAuthUser } = authUserSlice.actions;

export const selectAuthUser = (state) => state.authUser.current;

export default authUserSlice.reducer;
