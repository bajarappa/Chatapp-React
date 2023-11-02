import { Provider } from "react-redux";
import ChatPage from "./pages/ChatPage";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChatPage />
        </PersistGate>
      </Provider>
    </>
  );
}
