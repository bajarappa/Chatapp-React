import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state of the user data slice
const initialState = {
  loggedInUser: null,
  contacts: [],
  conversations: [],
  error: null,
  loading: "idle",
  selectedContact: null,
  searchTerm: "",
  filteredContacts: [],
  sidebarOpen: false,
  selectedContactId: null,
};

// Create an asynchronous thunk to fetch user data from a JSON file
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

// Create a user data slice with reducers and extra reducers
export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    // Set the selected contact and its ID
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
      state.selectedContactId = action.payload.id;
    },
    // Set the search term and filter contacts based on it
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredContacts = state.contacts.filter((contact) => {
        const name = `${contact.name}`.toLowerCase();
        return name.includes(state.searchTerm);
      });
    },
    // Toggle the sidebar open/close state
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state while fetching user data
      .addCase(fetchUserData.pending, (state, action) => {
        state.loading = "Loading";
      })
      // Handle successful data fetch
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loggedInUser = action.payload.loggedInUser;
        state.contacts = action.payload.contacts;
        state.conversations = action.payload.conversations;
        state.loading = "Succeeded";
      })
      // Handle data fetch failure
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = "Failed";
        state.error = action.payload;
      })
      // Handle sending a message
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
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
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

// Extract the user reducer and actions
export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;

// Selector to get the user data from the state
export const userSelector = (state) => state.userData;
