import { FaPaperPlane } from "react-icons/fa";

const Chat = ({ messages, onSendMessage }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-lg"
          placeholder="Type a message"
        />
        <button className="bg-blue-500 text-white p-2 rounded-r-lg">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chat;
