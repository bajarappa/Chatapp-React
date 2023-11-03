import React from "react";

// ConversationHeader component displays the header for the selected conversation.
// It receives the `selectedContact` data to show contact information.
export default function ConversationHeader({ selectedContact }) {
  return (
    <>
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4  sm:gap-x-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-x-4">
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={selectedContact.avatar}
            alt={selectedContact.name}
          />
          <div className="flex-auto">
            <div className="flex items-baseline justify between gap-x-4">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {selectedContact.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
