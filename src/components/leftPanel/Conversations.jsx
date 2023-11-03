import { useDispatch, useSelector } from "react-redux";
import Conversation from "./Conversation";
import { fetchUserData, userSelector } from "../../redux/reducers/userReducer";
import { useEffect, useState } from "react";

export default function Conversations({
  contactprop,
  conversations,
  filteredContacts,
  selectedContactId,
}) {
  const contacts = filteredContacts.length > 0 ? filteredContacts : contactprop;

  // const contacts = filteredContacts || contactprop;
  return (
    <>
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {contacts
              .filter((contact) => {
                const conversation = conversations.find(
                  (conv) => conv.contactId === contact.id
                );
                return conversation && conversation.messages.length > 0;
              })
              .map((contact) => {
                const conversation = conversations.find(
                  (conv) => conv.contactId === contact.id
                );
                return (
                  <Conversation
                    key={contact.id}
                    contact={contact}
                    conversation={conversation}
                    selectedContactId={selectedContactId}
                  />
                );
              })}
          </ul>
        </li>
      </ul>
    </>
  );
}
