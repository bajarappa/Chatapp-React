import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../redux/reducers/userReducer";
import SendMessages from "./SendMessages";
import ChatMessages from "./ChatMessages";

export default function Messages({ selectedContact, conversations }) {
  const params = useParams();
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    if (selectedContact) {
      const contactId = selectedContact.id;
      if (newMessage.trim() !== "") {
        dispatch(
          sendMessage({
            contactId,
            text: newMessage,
            isMyMessage: true,
            timestamp: new Date().toISOString(),
          })
        );
        setNewMessage("");
      }
    }
  };

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
    <div className="chat-messages">
      {conversation ? (
        conversation.messages?.map((message) => (
          <ChatMessages key={message.id} message={message} />
        ))
      ) : (
        <div>No messages.</div>
      )}
      <SendMessages
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}
