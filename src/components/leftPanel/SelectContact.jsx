import React from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/reducers/userReducer";

export default function SelectContact({ contact }) {
  const dispatch = useDispatch();
  const handleSelectConversation = (contact) => {
    dispatch(userActions.setSelectedContact(contact));
    dispatch(userActions.toggleSidebar());
    dispatch(userActions.setSearchTerm(""));
  };
  return (
    <>
      <Link key={contact.id} to={`/conversation/${contact.id}`}>
        <div
          onClick={handleSelectConversation()}
          className={
            "flex items-center gap-x-4 rounded-md p-2 text-sm leading-6 font-semibold hover:bg-gray-50"
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
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
