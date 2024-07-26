"use client";

import { useState } from "react";
import VideoSection from "./VideoSection";
import ParticipantList from "./ParticipantList";
import ChatSection from "./ChatSection";

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
      {showChat && <ChatSection setShowChat={setShowChat} showChat={showChat} />}
    </div>
  );
}
