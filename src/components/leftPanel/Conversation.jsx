import React from "react";
import { Link } from "react-router-dom";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Conversation({ contact, conversation }) {
  return (
    <>
      <li key={contact.name}>
        <Link
          to={`/conversation/${contact.id}`}
          className={classNames(
            contact.current
              ? "bg-gray-50 text-indigo-600"
              : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
          )}
        >
          <div className="flex items-center gap-x-4">
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
    </>
  );
}
