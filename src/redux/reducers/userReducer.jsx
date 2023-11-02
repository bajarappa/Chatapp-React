import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loggedInUser: null,
  contacts: [],
  conversations: [],
  error: null,
  loading: "idle",
};

export const fetchUserData = createAsyncThunk(
  "userData/fetchUserData",
  async () => {
    try {
      const result = await axios.get("./dummyUserData.json");
      const data = result.data;
      return data;
    } catch (err) {
      console.error(err);
      return Promise.reject("Failed to fetch user data");
    }
  }
);

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state, action) => {
        state.loading = "Loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loggedInUser = action.payload.loggedInUser;
        state.contacts = action.payload.contacts;
        state.conversations = action.payload.conversations;

        state.loading = "Succeeded";
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = "Failed";
        state.error = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;

// Selector
export const userSelector = (state) => state.userData;
