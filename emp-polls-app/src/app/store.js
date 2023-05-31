import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "../features/counter/counterSlice";
import usersReducer from "../features/users/usersSlice";
import authUserReducer from "../features/authUser/authUserSlice";

export const store = configureStore({
  reducer: {
    //TODO: CLEANUP
    // counter: counterReducer,
    users: usersReducer,
    authUser: authUserReducer,
  },
});
