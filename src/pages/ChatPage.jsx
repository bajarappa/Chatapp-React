import { useEffect, useState } from "react";
import Conversations from "../components/leftPanel/Conversations";
import CreateConversation from "../components/leftPanel/CreateConversation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, userSelector } from "../redux/reducers/userReducer";
import Messages from "../components/rightPanel/Messages";

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userData = useSelector(userSelector);
  const dispatch = useDispatch();
  // console.log(userData.contacts);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <>
      <div>
        {/* ////////////////// {Left panel} ///////////////////// */}
        <CreateConversation sidebarOpen setSidebarOpen />

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <Conversations
                contacts={userData.contacts}
                conversations={userData.conversations}
              />
            </nav>
          </div>
        </div>
        {/* ////////////////// {Right panel} ///////////////////// */}
        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <p>Header</p>
          </div>
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <Messages
                contacts={userData.contacts}
                conversations={userData.conversations}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
