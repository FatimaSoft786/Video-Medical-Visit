import { useState } from "react";
import { Input, Avatar } from "@nextui-org/react";
import { RxCross1 } from "react-icons/rx";

export default function ChatSection({ setShowChat, showChat }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      const message = { content: messageInput, timestamp: new Date(), name: "User", picture: "/img/user.png" };
      setMessages([...messages, message]);
      setMessageInput("");
    }
  };

  return (
    <div className="fixed border bottom-4  right-4 w-[30%] max-md:top-1/2 max-md:right-[20%] max-md:w-[300px] max-w-[400px] h-fit min-h-[50vh] bg-gray-200/30 backdrop-blur-md rounded-lg shadow-3xl">
      <div className="flex flex-col h-full">
        <div onClick={() => setShowChat(!showChat)} className="absolute z-10 top-1.5 p-2.5 right-4 transition-all">
          <RxCross1 className="size-8 p-2 rounded-full transition-all bg-gray-50/80 hover:opacity-85 cursor-pointer active:scale-95" />
        </div>
        <div className="flex-1 relative p-4 mb-20 h-full max-h-56 overflow-y-scroll">
          {messages.map((msg, index) => (
            <div key={index} className="flex items-start mb-2">
              <Avatar className="size-10" src={msg.picture} />
              <div className="ml-2 bg-white p-2 rounded-lg shadow-sm">
                <p className="text-sm font-medium">{msg.name}</p>
                <p className="text-xs text-gray-600">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
          {messages.length === 0 && <p className="absolute flex items-center text-gray-500/50 justify-center h-full w-full">No message</p>}
        <div className="flex items-center px-8 py-4 bg-white/50 backdrop-blur-xl absolute bottom-0 w-full rounded-b-lg">
          <div className="relative flex max-h-24 w-full items-center">
            <Input
              radius="full"
              size="lg"
              className="flex-grow"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              startContent={<img src="/doctor/frame/fileupload.svg" />}
            />
            <button onClick={sendMessage} className="bg-blue-500 active:scale-80 transition-all rounded-full absolute right-0 p-2">
              <img src="/doctor/frame/send.svg" alt="" className="size-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
