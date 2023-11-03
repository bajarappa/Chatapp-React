import { XMarkIcon } from "@heroicons/react/24/outline";

// SidebarToggleButton component is responsible for rendering the button that allows closing the sidebar.
// It receives a function, `handleToggleSidebar`, to handle the sidebar closing action.
export default function SidebarToggleButton({ handleToggleSidebar }) {
  return (
    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
      <button
        type="button"
        className="-m-2.5 p-2.5"
        onClick={handleToggleSidebar}
      >
        <span className="sr-only">Close sidebar</span>
        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
      </button>
    </div>
  );
}
