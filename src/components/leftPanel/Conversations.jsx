import React from "react";
import Conversation from "./Conversation";

export default function Conversations({
  contactprop,
  conversations,
  filteredContacts,
  selectedContactId,
}) {
  // Determine the list of contacts to display based on the filter or all contacts
  const contacts = filteredContacts.length > 0 ? filteredContacts : contactprop;

  return (
    <ul role="list" className="flex flex-1 flex-col gap-y-7">
      <li>
        <ul role="list" className="-mx-2 space-y-1">
          {contacts
            .filter((contact) => {
              // Filter contacts with conversations that have messages
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
                // Render a Conversation component for each contact
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
  );
}
