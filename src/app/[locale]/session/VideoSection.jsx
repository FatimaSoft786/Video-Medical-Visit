"use client";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { FaPhone, FaUsers } from "react-icons/fa";
import { BiVolumeMute, BiVideoOff } from "react-icons/bi";
import useMediaStream from "@/hooks/useMediaStream";
import usePeer from "@/hooks/usePeer";
import usePlayer from "@/hooks/usePlayer";
import { useSocket } from "@/app/context/Context";
import { cloneDeep } from "lodash";
import Player from "@/app/Player";
import EndCallModal from "./EndCallModal";


// Initialize Socket.IO client
//const socket = io("https://video-medical-backend-production.up.railway.app/");

export default function VideoSection({ onChatToggle, onParticipantsToggle,roomId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const socket = useSocket();
 
 useEffect(()=>{
  localStorage.setItem('roomId',roomId);
 },[])

  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();

  const [users, setUsers] = useState([])

   const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom
  } = usePlayer(myId, roomId, peer);


  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser) => {
      console.log(`user connected in room with userId ${newUser}`);

      const call = peer.call(newUser, stream);

      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${newUser}`);
        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [newUser]: call
        }))
      });
    };
    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, setPlayers, socket, stream]);

  useEffect(() => {
    if (!socket) return;
    const handleToggleAudio = (userId) => {
      console.log(`user with id ${userId} toggled audio`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].muted = !copy[userId].muted;
        return { ...copy };
      });
    };

    const handleToggleVideo = (userId) => {
      console.log(`user with id ${userId} toggled video`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy[userId].playing;
        
        return { ...copy };
      });
    };

    const handleUserLeave = (userId) => {
      console.log(`user ${userId} is leaving the room`);
      users[userId]?.close()
      const playersCopy = cloneDeep(players);
      delete playersCopy[userId];
      setPlayers(playersCopy);
    }
    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-leave", handleUserLeave);
    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
      socket.off("user-leave", handleUserLeave);
    };
  }, [players, setPlayers, socket, users]);

  useEffect(() => {
    if (!peer || !stream) return;
    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${callerId}`);
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [callerId]: call
        }))
      });
    });
  }, [peer, setPlayers, stream]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log(`setting my stream ${myId}`);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: true,
      },
    }));
  }, [myId, setPlayers, stream]);
  
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      <div className="relative w-full h-full bg-black backdrop-blur-2xl">
      
       <>
       {playerHighlighted && (
        <div className=" flex h-full w-full bg-black object-contain">
         <Player 
            url={playerHighlighted.url}
            muted={playerHighlighted.muted}
            playing={playerHighlighted.playing}
            isActive
          />
        </div>
        )}
       </>

  {
    nonHighlightedPlayers && (
 <div className=" bottom-20 absolute z-10 w-1/4 h-1/4 rounded-xl">
         {Object.keys(nonHighlightedPlayers).map((playerId) => {
          const { url, muted, playing } = nonHighlightedPlayers[playerId];
          return (
            <Player
              key={playerId}
              url={url}
              muted={muted}
              playing={playing}
              isActive={false}
            />
          );
        })}
       </div>
    )
  }
      
      
      </div>
      <div className="absolute bottom-0 backdrop-blur-2xl left-0 w-full p-4 flex justify-center space-x-4 bg-white">
        <button
          className="relative rounded-full"
          onClick={toggleAudio}>
          {playerHighlighted?.muted ? <BiVolumeMute className="size-10 p-2 rounded-full active:ring-4 ring-red-500/30 focus-within:ring-4 outline-none bg-red-600 text-white" /> : <img className="size-10 p-2 rounded-full bg-blue-600 active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none" src='/doctor/frame/mic.svg' /> }
        </button>
        <button
          className="relative rounded-full size-10"
          onClick={toggleVideo}
        >
          {playerHighlighted?.playing ? <img className="size-10 p-2 rounded-full active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none bg-blue-600" src='/doctor/frame/videoicon.svg' /> : <BiVideoOff className="size-10 p-2 rounded-full text-white active:ring-4 ring-red-500/30 focus-within:ring-4 outline-none bg-red-600" />}
        </button>
        <CallButton icon="/doctor/frame/record.svg" bgColor="bg-red-500/20" />
        <CallButton icon="/doctor/frame/message.svg" onClick={() => onChatToggle()} />
        <button
          className="relative rounded-full active:ring-4 bg-blue-500/20 ring-blue-500/30 focus-within:ring-4 outline-none"
          onClick={() => onParticipantsToggle()}
        >
          <FaUsers className="size-10 p-2 text-blue-600"/>
        </button>  
        <button onClick={openModal} className="top-4 right-4 px-6 py-3 rounded-full bg-red-500 text-white active:ring-4 ring-red-500/30 focus-within:ring-4 outline-none">
          <FaPhone className="size-4" />
        </button>
      </div>
      <EndCallModal isOpen={isModalOpen} onClose={closeModal} />
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
