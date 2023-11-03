import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { sendMessage } from "../../redux/reducers/userReducer";
import { useDispatch } from "react-redux";

export default function Messages({ selectedContact, conversations }) {
  const params = useParams();
  // console.log(params);
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
  const handleSendMessage = () => {
    if (selectedContact) {
      // Check if a contact is selected
      const contactId = selectedContact.id;
      if (newMessage.trim() !== "") {
        // Check if the message is not empty
        dispatch(
          sendMessage({
            contactId,
            text: newMessage,
            isMyMessage: true,
            timestamp: new Date().toISOString(),
          })
        );
        setNewMessage(""); // Clear the message input
      }
    }
  };
  // Find the conversation for the selected contact
  const conversation =
    selectedContact &&
    conversations.find((conv) => conv.contactId === selectedContact.id);

  if (!selectedContact) {
    return (
      <div className="chat-messages">
        Select a contact to start a conversation.
      </div>
    );
  }
  return (
    <>
      {selectedContact && (
        <div className="chat-messages">
          {conversation ? (
            conversation.messages?.map((message) => (
              <div
                key={message.id}
                className={
                  message.isMyMessage
                    ? "col-start-6 col-end-13 p-3 rounded-lg"
                    : "col-start-1 col-end-8 p-3 rounded-lg"
                }
              >
                <div
                  className={
                    message.isMyMessage
                      ? "flex items-center justify-start flex-row-reverse"
                      : "flex flex-row items-center"
                  }
                >
                  <div
                    className={
                      message.isMyMessage
                        ? "flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                        : "flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    }
                  >
                    A
                  </div>
                  <div
                    className={
                      message.isMyMessage
                        ? " relative mr-3 text-base bg-indigo-100 py-2 px-4 shadow rounded-xl"
                        : "relative ml-3 text-base bg-white py-2 px-4 shadow rounded-xl"
                    }
                  >
                    <div>{message.text}</div>
                    <div className="text-right text-xs">
                      {message.timestamp}
                    </div>
                    <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                      Seen
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No messages.</div>
          )}
          <div className="fixed inset-x-0 bottom-0 left-96 z-40 h-16 flex items-center gap-x-4 border-b border-gray-200 bg-gray-100 px-4">
            <div className="flex flex-row items-center h-16 w-full  bg-gray-100 px-4">
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    type="text"
                    className="w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button
                  onClick={handleSendMessage}
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
