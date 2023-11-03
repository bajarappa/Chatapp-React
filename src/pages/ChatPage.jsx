import { useEffect, useState } from "react";
import Conversations from "../components/leftPanel/Conversations";
import CreateConversation from "../components/leftPanel/CreateConversation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, userSelector } from "../redux/reducers/userReducer";
import Messages from "../components/rightPanel/Messages";
import ConversationHeader from "../components/rightPanel/ConversationHeader";
import UserHeader from "../components/leftPanel/UserHeader";
import SearchContacts from "../components/SearchContacts";

export default function ChatPage() {
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
        <CreateConversation
          sidebarOpen={userData.sidebarOpen}
          contactprop={userData.contacts}
          conversations={userData.conversations}
          filteredContacts={userData.filteredContacts}
        />

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-96 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white pb-4">
            <UserHeader loggedInUser={userData.loggedInUser} />
            <div className="flex items-center justify-center px-0">
              <SearchContacts searchTerm={userData.searchTerm} />
            </div>
            <nav className="flex flex-1 flex-col px-6">
              <Conversations
                contactprop={userData.contacts}
                conversations={userData.conversations}
                filteredContacts={userData.filteredContacts}
                selectedContactId={userData.selectedContactId}
              />
            </nav>
          </div>
        </div>
        {/* ////////////////// {Right panel} ///////////////////// */}
        <div className="lg:pl-96">
          {userData.selectedContact && (
            <ConversationHeader selectedContact={userData.selectedContact} />
          )}

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {userData.selectedContact ? (
                <Messages
                  contacts={userData.contacts}
                  conversations={userData.conversations}
                  selectedContact={userData.selectedContact}
                />
              ) : (
                <div>Select a contact to start a conversation.</div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
