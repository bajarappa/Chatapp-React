export default function ChatMessage({ message }) {
  return (
    <div
      className={
        message.isMyMessage
          ? "col-start-6 col-end-13 p-3 rounded-lg"
          : "col-start-1 col-end-8 p-3 rounded-lg"
      }
    >
      <div
        className={
          message.isMyMessage
            ? "flex items-center justify-start flex-row-reverse"
            : "flex flex-row items-center"
        }
      >
        {/* <div
          className={
            message.isMyMessage
              ? "flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
              : "flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
          }
        >
          A
        </div> */}
        <div
          className={
            message.isMyMessage
              ? "relative mr-3 text-base bg-indigo-100 py-2 px-4 shadow rounded-xl"
              : "relative ml-3 text-base bg-white py-2 px-4 shadow rounded-xl"
          }
        >
          <div>{message.text}</div>
          <div className="text-right text-xs">{message.timestamp}</div>
          <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
            Seen
          </div>
        </div>
      </div>
    </div>
  );
}
