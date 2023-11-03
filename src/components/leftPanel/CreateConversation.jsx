import React from "react";
import { useDispatch } from "react-redux";
import { Transition, Dialog } from "@headlessui/react";
import { Link } from "react-router-dom";
import SearchContacts from "../SearchContacts";
import { userActions } from "../../redux/reducers/userReducer";
import SidebarToggleButton from "./SidebarToggleButton";
import SidebarHeader from "./SidebarHeader";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ContactList from "./ContactList";

export default function CreateConversation({
  conversations,
  contactprop,
  sidebarOpen,
  filteredContacts,
}) {
  const dispatch = useDispatch();

  // Function to handle closing the sidebar
  const handleToggleSidebar = () => {
    dispatch(userActions.toggleSidebar());
  };

  // Function to handle selecting a conversation/contact
  const handleSelectConversation = (contact) => {
    dispatch(userActions.setSelectedContact(contact));
    dispatch(userActions.toggleSidebar());
    dispatch(userActions.setSearchTerm(""));
  };

  // Determine the list of contacts to display
  const contacts = filteredContacts.length > 0 ? filteredContacts : contactprop;

  return (
    <Transition.Root show={sidebarOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleToggleSidebar}>
        {/* Overlay */}
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={React.Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              {/* Render the sidebar toggle button */}
              <SidebarToggleButton handleToggleSidebar={handleToggleSidebar} />

              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white pb-4">
                {/* Render the sidebar header */}
                <SidebarHeader />

                {/* Render the search input */}
                <div className="flex items-center justify-center px-6">
                  <SearchContacts />
                </div>

                {/* Render the contact list */}
                <ContactList
                  contacts={contacts}
                  handleSelectConversation={handleSelectConversation}
                  conversations={conversations}
                />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
