import { Provider } from "react-redux";
import ChatPage from "./pages/ChatPage";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Conversation from "./components/leftPanel/Conversation";
import ErrorPage from "./pages/ErrorPage";

let persistor = persistStore(store);

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

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </>
  );
}
