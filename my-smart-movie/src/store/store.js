import { configureStore } from "@reduxjs/toolkit";
import { configurationSlice, moviesSlice } from "./slices";

export const storeActions = {
  configuration: configurationSlice.actions,
  movies: moviesSlice.actions,
};

export const reduxStore = configureStore({
  reducer: {
    configuration: configurationSlice.reducer,
    movies: moviesSlice.reducer,
  },
});
