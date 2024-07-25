"use client";
import { Button, Avatar, Input } from "@nextui-org/react";
import { useState } from "react";
import { FaPhone, FaUsers } from "react-icons/fa";
import { BiVolumeMute, BiVideoOff, BiPhoneCall } from "react-icons/bi";
import { CiStreamOn } from "react-icons/ci";
import { MdChat } from "react-icons/md";

function VideoSection({ onChatToggle, onParticipantsToggle }) {
  const [isMuteEnabled, setIsMuteEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  const handleCallUser = () => {
    // handle call user functionality
  };

  const handleRoomDisconnect = () => {
    // handle room disconnect functionality
  };

  const sendStreams = () => {
    // handle sending streams functionality
  };

  return (
    <div className="relative w-full h-full flex flex-col rounded-xl overflow-hidden">
      <div className="relative w-full h-full bg-gray-200/20 backdrop-blur-2xl">
        <img src="/doctor/frame/Frameimg.svg" className="object-cover w-full h-full" alt="Video call" />
        <div className="absolute top-4 left-4 bg-gray-800/30 text-white rounded-2xl px-4 py-2 text-xs">
          {remoteSocketId ? "Connected" : "No one in room"}
        </div>
        <div className="absolute top-4 right-4 bg-gray-800/30 text-white rounded-2xl p-2 text-sm">
          <img src="/doctor/frame/fullscreen.svg" alt="" className="size-4" />
        </div>
        <div className="absolute bottom-4 right-4 bg-gray-800/30 text-white rounded-2xl p-2 text-sm">
          <img src="/doctor/frame/voice.svg" alt="" className="size-4" />
        </div>
      </div>
      <div className="absolute bottom-0  backdrop-blur-2xl left-0 w-full p-4 flex justify-center space-x-4 bg-white/20 bg-opacity-60">
        <button
          className="relative rounded-full "
          onClick={() => setIsMuteEnabled(!isMuteEnabled)}
        >
          {isMuteEnabled ? <img className="size-10 p-2 rounded-full bg-blue-600 active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none " src='/doctor/frame/mic.svg' /> : <BiVolumeMute className="size-10 p-2 rounded-full active:ring-4 ring-red-500/30 focus-within:ring-4 outline-none  bg-red-600 text-white" />}
        </button>
        <button
          className="relative rounded-full "
          onClick={() => setIsVideoEnabled(!isVideoEnabled)}
        >
          {isVideoEnabled ? <img className="size-10 p-2 rounded-full active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none bg-blue-600" src='/doctor/frame/videoicon.svg' /> : <BiVideoOff className="size-10 p-2 rounded-full text-white active:ring-4 ring-red-500/30 focus-within:ring-4 outline-none bg-red-600" />}
        </button>
        <CallButton icon="/doctor/frame/share.svg" />
        <CallButton icon="/doctor/frame/record.svg" bgColor="bg-red-500/20" />
        <CallButton icon="/doctor/frame/message.svg" onClick={() => onChatToggle()} />
        <button      
         className={`relative rounded-full active:ring-4 bg-blue-500/20 ring-blue-500/30 focus-within:ring-4 outline-none`}
         onClick={() => onParticipantsToggle()}>
          <FaUsers className="size-10 p-2 text-blue-600"/>
        </button>
        {myStream && <button className="relative rounded-full active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none bg-blue-500" onClick={sendStreams}>
          <CiStreamOn className="size-10 p-2 rounded-full text-white" />
        </button>}
        
      <button onClick={handleRoomDisconnect} className="top-4 right-4 px-6 py-3 rounded-full bg-red-500 text-white active:ring-4 ring-red-500/30 focus-within:ring-4 outline-none">
        <FaPhone className="size-4" />
      </button>
      </div>
    </div>
  );
}


function CallButton({ icon, bgColor = "bg-blue-500/20", onClick }) {
  return (
    <button
      className={`relative rounded-full active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none ${bgColor}`}
      onClick={onClick}
    >
      <img src={icon} className="size-10 p-2 rounded-full" />
    </button>
  );
}

function ParticipantList() {
  const [showList, setShowList] = useState(false);
  const participants = [
    {
      name: "Dianne Russell",
      avatar: "/img/user.png",
      mic: "/doctor/frame/micactive.svg",
      video: "/doctor/frame/videooff.svg",
    },
    {
      name: "John Doe",
      avatar: "/img/user.png",
      mic: "/doctor/frame/micactive.svg",
      video: "/doctor/frame/videooff.svg",
    },
  ];

  return (
    <div className={`fixed backdrop-blur-3xl top-0 right-[30%] w-[30%] max-md:mt-12 max-md:right-3/4 max-md:w-fit min-h-fit bg-gray-200/20 rounded-lg shadow-xl transition-transform translate-x-full ${showList && "!border-xl"}`}>
      <div className={`flex items-center justify-between bg-white/50 backdrop-blur-3xl px-6 py-3 rounded-t-xl ${!showList && "!rounded-b-xl"}`}>
        <h3 className="text-lg font-semibold">Participants</h3>
        <Button
          radius="full"
          className="bg-blue-500/10 flex gap-1 items-center text-blue-600"
        >
          <span className="max-xl:hidden max-md:block">Add Participant</span>
          <img src="/doctor/frame/adduser.svg" alt="add user" />
        </Button>
        <img
          src="/doctor/frame/navigation.svg"
          onClick={() => setShowList(!showList)}
          className={`cursor-pointer transition-transform ${showList ? "rotate-180" : ""}`}
          alt=""
        />
      </div>
    {showList &&   (<div className="flex flex-col space-y-2 p-4 overflow-y-auto">
        {participants.map((participant, index) => (
          <ParticipantItem key={index} participant={participant} />
        ))}
      </div>)}
    </div>
  );
}

function ParticipantItem({ participant }) {
  return (
    <div className="flex items-center justify-between bg-white w-full px-6 py-3 rounded-full">
      <div className="flex space-x-2 items-center">
        <Avatar className="size-12" src={participant.avatar} />
        <span className="text-sm font-medium">{participant.name}</span>
      </div>
      <div className="flex space-x-2">
        <img src={participant.mic} className="size-6" />
        <img src={participant.video} className="size-6" />
      </div>
    </div>
  );
}

function ChatSection() {
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
    <div className="fixed border bottom-0 right-0 w-[30%] max-md:top-1/2 max-md:right-[20%] max-md:w-[300px] max-w-[400px] h-fit min-h-[50vh] bg-gray-200/30 backdrop-blur-md rounded-lg shadow-3xl">
      <div className="flex  flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index ) => (
            <div key={index} className="flex items-start mb-2">
              <Avatar className="size-10" src={msg.picture} />
              <div className="ml-2 bg-white p-2 rounded-lg shadow-sm">
                <p className="text-sm font-medium">{msg.name}</p>
                <p className="text-xs text-gray-600">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
        {messages.length === 0 && <p className="flex items-center justify-center h-full w-full">No message</p> }
        <div className="flex items-center px-8 py-4 bg-white absolute bottom-0 w-full rounded-b-lg">
      <div className="relative flex w-full items-center">
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

export default function VideoCallPage() {
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  return (
    <div className="relative w-screen h-screen bg-gray-900">
      <VideoSection
        onChatToggle={() => setShowChat(!showChat)}
        onParticipantsToggle={() => setShowParticipants(!showParticipants)}
      />
      {showParticipants && <ParticipantList />}
      {showChat && <ChatSection />}
    </div>
  );
}
