import React from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import SearchContacts from "../SearchContacts";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/reducers/userReducer";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CreateConversation({
  conversations,
  contactprop,
  sidebarOpen,
  filteredContacts,
}) {
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(userActions.toggleSidebar());
  };
  const handleSelectConversation = (contact) => {
    dispatch(userActions.setSelectedContact(contact));
    dispatch(userActions.toggleSidebar());
    dispatch(userActions.setSearchTerm(""));
  };
  const contacts = filteredContacts.length > 0 ? filteredContacts : contactprop;

  // const contacts = filteredContacts || contacts;

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 "
          onClose={handleToggleSidebar}
        >
          <Transition.Child
            as={Fragment}
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
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={handleToggleSidebar}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="sticky top-0 z-40 flex justify-between h-16 shrink-0 items-center border-b border-gray-200 bg-white px-6">
                    <div className="flex items-center gap-x-4">
                      <div className="flex-auto">
                        <div className="flex items-baseline justify-between gap-x-4">
                          <p className="text-xl font-semibold leading-6 text-gray-900">
                            Contacts
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center px-6">
                    <SearchContacts />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className=" ">
                          {contacts.map((contact) => {
                            const conversation = conversations.find(
                              (conv) => conv.contactId === contact.id
                            );
                            return (
                              <>
                                <Link
                                  key={contact.id}
                                  to={`/conversation/${contact.id}`}
                                >
                                  <div
                                    onClick={() =>
                                      handleSelectConversation(contact)
                                    }
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
                          })}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
