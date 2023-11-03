export default function SidebarHeader() {
  return (
    <div className="sticky top-0 z-40 flex justify-between h-16 shrink-0 items-center border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-x-4">
        <div className="flex-auto">
          <div className="flex items-baseline justify between gap-x-4">
            <p className="text-xl font-semibold leading-6 text-gray-900">
              Contacts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
