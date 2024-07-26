"use client";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { FaPhone, FaUsers } from "react-icons/fa";
import { BiVolumeMute, BiVideoOff } from "react-icons/bi";
import { CiStreamOn } from "react-icons/ci";

// Initialize Socket.IO client
const socket = io("https://video-medical-backend-production.up.railway.app/");

export default function VideoSection({ onChatToggle, onParticipantsToggle }) {
  const [isMuteEnabled, setIsMuteEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const localVideoRef = useRef(null);
  const [myStream, setMyStream] = useState(null);

  useEffect(() => {
    async function getLocalStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setMyStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        socket.emit('joinRoom', { roomId: 'your-room-id' }); // Replace with your room ID
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    }

    getLocalStream();

    socket.on('user-connected', (peerId) => {
      // Code to handle new user connection
      console.log("User connected:", peerId);
    });

    socket.on('offer', ({ offer, from }) => {
      // Code to handle incoming offer
      console.log("Received offer from", from);
    });

    socket.on('answer', ({ answer, to }) => {
      // Code to handle incoming answer
      console.log("Received answer for", to);
    });

    socket.on('ice-candidate', ({ candidate, to }) => {
      // Code to handle incoming ICE candidate
      console.log("Received ICE candidate for", to);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCallUser = () => {
    // Implement call user functionality
  };

  const handleRoomDisconnect = () => {
    // Implement room disconnect functionality
    if (myStream) {
      myStream.getTracks().forEach(track => track.stop());
    }
    socket.disconnect();
  };

  const sendStreams = () => {
    // Implement sending streams functionality
  };

  return (
    <div className="relative w-full h-full flex flex-col rounded-xl overflow-hidden">
      <div className="relative w-full h-full bg-gray-200/20 backdrop-blur-2xl">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="object-cover w-full h-full"
          style={{ zIndex: 1, position: 'absolute' }}
        />
        {remoteStreams.map((stream, index) => (
          <video
            key={index}
            autoPlay
            className="object-cover w-full h-full"
            style={{ zIndex: 0, position: 'absolute' }}
            ref={(video) => {
              if (video) {
                video.srcObject = stream;
              }
            }}
          />
        ))}
        <div className="absolute top-4 left-4 bg-gray-800/30 text-white rounded-2xl px-4 py-2 text-xs">
          {remoteStreams.length > 0 ? "Connected" : "No one in room"}
        </div>
        
        <div className="absolute bottom-4 right-4 bg-gray-800/30 text-white rounded-2xl p-2 text-sm">
          <img src="/doctor/frame/voice.svg" alt="" className="size-4" />
        </div>
      </div>
      <div className="absolute bottom-0 backdrop-blur-2xl left-0 w-full p-4 flex justify-center space-x-4 bg-white/20 bg-opacity-60">
        <button
          className="relative rounded-full"
          onClick={() => setIsMuteEnabled(!isMuteEnabled)}
        >
          {isMuteEnabled ? <img className="size-10 p-2 rounded-full bg-blue-600 active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none" src='/doctor/frame/mic.svg' /> : <BiVolumeMute className="size-10 p-2 rounded-full active:ring-4 ring-red-500/30 focus-within:ring-4 outline-none bg-red-600 text-white" />}
        </button>
        <button
          className="relative rounded-full"
          onClick={() => setIsVideoEnabled(!isVideoEnabled)}
        >
          {isVideoEnabled ? <img className="size-10 p-2 rounded-full active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none bg-blue-600" src='/doctor/frame/videoicon.svg' /> : <BiVideoOff className="size-10 p-2 rounded-full text-white active:ring-4 ring-red-500/30 focus-within:ring-4 outline-none bg-red-600" />}
        </button>
        <CallButton icon="/doctor/frame/share.svg" />
        <CallButton icon="/doctor/frame/record.svg" bgColor="bg-red-500/20" />
        <CallButton icon="/doctor/frame/message.svg" onClick={() => onChatToggle()} />
        <button
          className="relative rounded-full active:ring-4 bg-blue-500/20 ring-blue-500/30 focus-within:ring-4 outline-none"
          onClick={() => onParticipantsToggle()}
        >
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

export function CallButton({ icon, bgColor = "bg-blue-500/20", onClick }) {
  return (
    <button
      className={`relative rounded-full active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none ${bgColor}`}
      onClick={onClick}
    >
      <img src={icon} className="size-10 p-2 rounded-full" />
    </button>
  );
}
