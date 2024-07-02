"use client";
import { Button, Avatar, Input } from "@nextui-org/react";
import { useState } from "react";
import { FaPhone } from "react-icons/fa";

function VideoSection() {
  return (
    <div className="flex flex-col w-[70%] max-md:w-full rounded-xl overflow-hidden">
      <div className="relative bg-gray-200/20 px-2">
        <img
          src="/doctor/frame/Frameimg.svg"
          alt="Video call"
          className="w-full"
        />
        <div className="absolute top-4 left-4 bg-gray-800/30 text-white rounded-2xl px-4 py-2 text-xs">
          24:01:45
        </div>
        <div className="absolute top-4 right-4 bg-gray-800/30 text-white rounded-2xl p-2 text-sm">
          <img src="/doctor/frame/fullscreen.svg" alt="" className="size-4" />
        </div>
        <div className="absolute bottom-4 left-4 bg-gray-800/30 text-white rounded-2xl px-4 py-2 text-sm">
          Adam Joseph
        </div>
        <div className="absolute bottom-4 right-4 bg-gray-800/30 text-white rounded-2xl p-2 text-sm">
          <img src="/doctor/frame/voice.svg" alt="" className="size-4" />
        </div>
      </div>
      <ParticipantsThumbnails />
      <CallControls />
    </div>
  );
}

function ParticipantsThumbnails() {
  const participants = [
    "Adam Joseph",
    "Theresa Webb",
    "Christian Wong",
    "User",
  ];
  return (
    <div className="flex justify-between items-center py-3 bg-gray-200/20 px-2">
      <div className="grid grid-cols-4 gap-4">
        {participants.map((participant, index) => (
          <div key={index} className="flex flex-col items-center relative">
            <img
              src="/doctor/frame/Frameimg.svg"
              alt={participant}
              className="rounded-lg"
            />
            <div className="absolute max-lg:hidden max-md:block bottom-2 left-4 text-xs bg-gray-800/30 text-white rounded-2xl px-4 py-2">
              {participant}
            </div>
            <img
              src="/doctor/frame/mic.svg"
              className="size-8 p-2 max-md:size-6 max-md:p-1 rounded-full bg-red-600 absolute bottom-2 right-4 max-md:right-1 max-md:bottom-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CallControls() {
  return (
    <div className="flex justify-center relative items-center p-4 space-x-4">
      <div className="relative gap-4 flex items-center max-md:mr-6">
        <CallButton icon="/doctor/frame/mic.svg" bgColor="bg-blue-500" />
        <CallButton icon="/doctor/frame/videoicon.svg" bgColor="bg-blue-500" />
        <CallButton icon="/doctor/frame/share.svg" />
        <CallButton icon="/doctor/frame/record.svg" bgColor="bg-red-500/20" />
        <CallButton icon="/doctor/frame/message.svg" />
        <CallButton icon="/doctor/frame/dots.svg" />
      </div>
      <button className="absolute flex items-center gap-2 px-6 right-4 py-3 rounded-3xl bg-red-500 text-white active:ring-4 ring-red-500/30 focus-within:ring-4 outline-none">
        <FaPhone className="size-4 max-lg:block hidden max-xl:hidden" />
        <div className="max-lg:hidden max-md:block">End Call</div>
      </button>
    </div>
  );
}

function CallButton({ icon, bgColor = "bg-blue-500/20" }) {
  return (
    <button
      className={`relative rounded-full active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none ${bgColor}`}
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
      name: "Dianne Russell",
      avatar: "/img/user.png",
      mic: "/doctor/frame/micactive.svg",
      video: "/doctor/frame/videooff.svg",
    },
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
    // Add more participants as needed
  ];

  return (
    <div className="w-[30%] shadow-xl transition-all flex max-md:w-full flex-col bg-gray-200/20 rounded-lg">
      <div className="flex items-center justify-between bg-white px-6 py-3 rounded-t-xl border-b">
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
          className={` cursor-pointer rotate-0 ${showList ? "rotate-180" : ""}`}
          alt=""
        />
      </div>
      {showList && (
        <div className="flex flex-col space-y-2 p-4 overflow-y-auto">
          {participants.map((participant, index) => (
            <ParticipantItem key={index} participant={participant} />
          ))}
        </div>
      )}
      <ChatSection />
    </div>
  );
}

function ParticipantItem({ participant }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex justify-between items-center bg-white w-full px-6 py-3 rounded-full">
        <div className="flex space-x-2 items-center">
          <Avatar className="size-12" src={participant.avatar} />
          <span className="text-sm font-medium">{participant.name}</span>
        </div>
        <div className="flex space-x-2">
          <img src={participant.mic} className="size-6" />
          <img src={participant.video} className="size-6" />
        </div>
      </div>
    </div>
  );
}
function ChatSection() {
  const [activeTab, setActiveTab] = useState("group");
  const [hide, setHide] = useState(false);
  return (
    <div className="transition-all duration-300 ease-soft-spring">
      <div className="flex items-center bg-white  justify-between max-lg:flex-col max-md:flex-row py-2 px-4 border-t rounded-b-2xl">
        <h3 className="text-lg font-semibold">Chats</h3>
        <div className="flex items-center gap-4">
          <div className="flex space-x-2 rounded-full bg-blue-500/10 p-2">
            <Button
              radius="full"
              className={`  px-4 ${
                activeTab === "group"
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-blue-500"
              }`}
              onClick={() => setActiveTab("group")}
            >
              Group
            </Button>
            <Button
              radius="full"
              className={`bg-transparent px-4 text-blue ${
                activeTab === "personal"
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-blue-500"
              }`}
              onClick={() => setActiveTab("personal")}
            >
              Personal
            </Button>
          </div>
          <img
            src="/doctor/frame/navigation.svg"
            onClick={() => setHide(!hide)}
            className={`cursor-pointer ${hide ? "rotate-180" : ""}`}
            alt=""
          />
        </div>
      </div>
      {hide ? null : <ChatContent activeTab={activeTab} />}
    </div>
  );
}

function ChatContent({ activeTab }) {
  const groupMessages = [
    {
      user: "Kathryn Murphy",
      message: "Good afternoon, everyone. We will start this meeting",
      time: "11:01 AM",
    },
    {
      user: "Kathryn Murphy",
      message: "Good afternoon, everyone. We will start this meeting",
      time: "11:01 AM",
    },
    // Add more group messages as needed
  ];

  const personalMessages = [
    {
      user: "John Doe",
      message: "Hello, can we discuss the project?",
      time: "10:45 AM",
    },
    // Add more personal messages as needed
  ];

  const messages = activeTab === "group" ? groupMessages : personalMessages;

  return (
    <div className="flex flex-col space-y-2 p-4 overflow-y-auto">
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
      <ChatInput />
    </div>
  );
}

function ChatMessage({ message }) {
  return (
    <div className="flex justify-between gap-2 space-y-1">
      <img src="/img/user.png" className="size-10" />
      <div className="flex flex-col w-[65%] rounded-2xl bg-white p-2">
        <span className="text-xs text-light-gray font-medium">
          {message.user}
        </span>
        <p className="text-sm">{message.message}</p>
      </div>
      <span className="text-xs text-gray-500">{message.time}</span>
    </div>
  );
}

function ChatInput() {
  return (
    <div className="flex items-center px-8 py-4 bg-white rounded-b-2xl">
      <div className="relative flex w-full items-center">
        <Input
          radius="full"
          size="lg"
          placeholder="Type Something..."
          className="flex-grow"
          startContent={<img src="/doctor/frame/fileupload.svg" />}
        />
        <button className="bg-blue-500 active:scale-80 transition-all rounded-full absolute right-0 p-2">
          <img src="/doctor/frame/send.svg" alt="" className="size-6" />
        </button>
      </div>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-gray-200/20">
      <title>Sessions | A Doctor's Appointment</title>
      <div className="flex w-full container mx-auto p-2 max-lg:p-0 max-lg:w-full max-sm:p-2 max-md:flex-col">
        <VideoSection />
        <ParticipantList />
      </div>
    </div>
  );
}
