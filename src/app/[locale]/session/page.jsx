"use client";

import { useState } from "react";
import VideoSection from "./VideoSection";
import ParticipantList from "./ParticipantList";
import ChatSection from "./ChatSection";
import { useSearchParams } from "next/navigation";
export default function VideoCallPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("room");
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

 if(!id){
  return (

  <div className="flex h-dvh justify-center items-center">
    <h1 className="text-4xl">You Are Not Authorized</h1>
  </div>
  )
 }else{
  return (
    <div className="relative w-screen h-screen bg-gray-900">
      <VideoSection roomId={id}
        onChatToggle={() => setShowChat(!showChat)}
        onParticipantsToggle={() => setShowParticipants(!showParticipants)}
      />
      {showParticipants && <ParticipantList />}
      {showChat && <ChatSection setShowChat={setShowChat} showChat={showChat} />}
    </div>
  );
 }
}
