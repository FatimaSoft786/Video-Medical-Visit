import { useState,useEffect } from "react";
import { Input, Avatar } from "@nextui-org/react";
import { RxCross1 } from "react-icons/rx";
import { useSocket } from "@/app/context/Context";
import { getUserSession } from "@/utils/session";

export default function ChatSection({ setShowChat, showChat }) {

   const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
 
   useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    return () => {
      socket.off("message");
    };
  }, [messages]);
  
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    const { user } = getUserSession();
    if (user) {
      setProfileData(user.user_details);
      
    } else {
      console.error("No user details found in session");
     
    }
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      const message = { content: messageInput, timestamp: new Date(), name: profileData.firstName +" "+ profileData.lastName, picture: profileData.picture_url ? profileData.picture_url : profileData.default_picture_url, type: "text" };
      socket.emit("message", message);
      setMessageInput("");
    }
  };

  return (
    <div className="fixed border bottom-4  right-4 w-[30%] max-md:top-1/2 max-md:right-[20%] max-md:w-[300px] max-w-[400px] h-fit min-h-[50vh] bg-white backdrop-blur-md rounded-lg shadow-3xl">
      <div className="flex flex-col h-full">
        <div onClick={() => setShowChat(!showChat)} className="absolute z-10 top-1.5 p-2.5 right-4 transition-all">
          <RxCross1 className="size-8 p-2 rounded-full transition-all bg-gray-50/80 hover:opacity-85 cursor-pointer active:scale-95" />
        </div>
        <div className="flex-1 relative p-4 mb-20 h-full max-h-56 overflow-y-scroll mt-7">
       {messages.map((msg, index) => (
      <div key={index} className="flex justify-between gap-0 space-y-2">
      <img src={msg.picture} className="size-10 mt-2.5" />
      <div className="flex flex-col w-[75%] rounded-2xl bg-white p-2">
        <span className="text-xs text-light-gray font-medium">
          {msg.name}
        </span>
        <p className="text-sm">{msg.content}</p>
      </div>
      <span className="text-xs text-gray-500 mt-4"></span>
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
