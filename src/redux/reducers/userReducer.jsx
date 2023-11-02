import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loggedInUser: null,
  contacts: [],
  conversations: [],
  error: null,
  loading: "idle",
  selectedContact: null,
  searchTerm: "",
  filteredContacts: [],
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

// Define a new action type and action creator for sending a message
export const sendMessage = createAction("user/sendMessage");

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredContacts = state.contacts.filter((contact) => {
        const name = `${contact.name}`.toLowerCase();
        return name.includes(state.searchTerm);
      });
    },
  },
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
      })
      .addCase(sendMessage, (state, action) => {
        const { contactId, text } = action.payload;

        const conversationIndex = state.conversations.findIndex(
          (conv) => conv.contactId === contactId
        );

        if (conversationIndex !== -1) {
          const conversation = state.conversations[conversationIndex];
          const newMessage = {
            id: conversation.messages.length + 1, // You can calculate the ID as needed
            text,
            isMyMessage: true,
            timestamp: new Date().toISOString(),
          };

          const updatedMessages = [...conversation.messages, newMessage];

          state.conversations[conversationIndex] = {
            ...conversation,
            messages: updatedMessages,
          };
        }
      });
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;

// Selector
export const userSelector = (state) => state.userData;
