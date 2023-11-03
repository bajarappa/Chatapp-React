import React from "react";
import { Provider } from "react-redux";
import ChatPage from "./pages/ChatPage";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Conversation from "./components/leftPanel/Conversation";
import ErrorPage from "./pages/ErrorPage";

// Initialize the Redux data persistence
let persistor = persistStore(store);

// Create a router for defining routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <ChatPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "conversation/:id",
        element: <Conversation />,
      },
    ],
  },
]);

// Main App component that wraps the entire application
export default function App() {
  return (
    <>
      {/* Provider for Redux store */}
      <Provider store={store}>
        {/* PersistGate for Redux data persistence */}
        <PersistGate loading={null} persistor={persistor}>
          {/* RouterProvider for handling routing */}
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </>
  );
}
