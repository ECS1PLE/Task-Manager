import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boardReducer";

// Функция для загрузки состояния из localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {}
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    boards: boardReducer,
  },
  preloadedState,
});
store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
