import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Slices/UserSlice";
const store = configureStore({
  reducer: { userAuth: UserReducer },
});

export default store;
