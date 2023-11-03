import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./reducers/userReducer"; // Import your userReducer
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";

// Configuration for data persistence
const persistConfig = {
  key: "root", // Key for the storage
  version: 1, // Version for the persisted data
  storage, // The storage engine (e.g., localStorage, AsyncStorage)
};

// Combine your reducers into a root reducer
export const reducers = combineReducers({
  userData: userReducer, // Add your userReducer to the root reducer
});

// Apply data persistence to the combined reducer
const persistedReducer = persistReducer(persistConfig, reducers);

// Create the Redux store with data persistence and middleware
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific actions for serialization check
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
