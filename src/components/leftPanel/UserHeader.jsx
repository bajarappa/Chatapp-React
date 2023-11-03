import React from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/reducers/userReducer";

export default function UserHeader({ loggedInUser }) {
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(userActions.toggleSidebar());
  };
  return (
    <>
      {loggedInUser && (
        <div className="sticky top-0 z-40 flex justify-between h-16 shrink-0 items-center border-b border-gray-200 bg-white px-4">
          <div className="flex items-center gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={loggedInUser.avatar}
              alt={loggedInUser.name}
            />
            <div className="flex-auto">
              <div className="flex items-baseline justify-between gap-x-4">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {loggedInUser.name}
                </p>
              </div>
            </div>
          </div>
          <div>
            <button onClick={handleToggleSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
