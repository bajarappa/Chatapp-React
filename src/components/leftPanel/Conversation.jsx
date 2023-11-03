import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../../redux/reducers/userReducer";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Conversation({
  contact,
  conversation,
  selectedContactId,
}) {
  const dispatch = useDispatch();

  // Handle selecting a conversation/contact
  const handleSelectConversation = (contact) => {
    dispatch(userActions.setSelectedContact(contact));
  };

  return (
    <li>
      <Link to={`/conversation/${contact.id}`}>
        <div
          onClick={() => handleSelectConversation(contact)}
          className={
            contact.id === selectedContactId
              ? "bg-gray-200 flex items-center gap-x-4 rounded-md p-2 text-sm leading-6 font-semibold"
              : "flex items-center gap-x-4 rounded-md p-2 text-sm leading-6 font-semibold hover:bg-gray-50"
          }
        >
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={contact.avatar}
            alt={contact.name}
          />
          <div className="flex-auto">
            <div className="flex items-baseline justify-between gap-x-4">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {contact.name}
              </p>
              <p className="flex-none text-xs text-gray-600">
                {conversation && conversation.messages.length > 0
                  ? conversation.messages[conversation.messages.length - 1]
                      .timestamp
                  : "No messages"}
              </p>
            </div>
            <p className="line-clamp-1 text-sm leading-6 text-gray-600">
              {conversation && conversation.messages.length > 0
                ? conversation.messages[conversation.messages.length - 1].text
                : "No messages"}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
