"use client";
import { useSocket } from "@/app/context/Context";
import Player from "@/app/Player";
import useMediaStream from "@/hooks/useMediaStream";
import usePeer from "@/hooks/usePeer";
import usePlayer from "@/hooks/usePlayer";
import useRecorder from "@/hooks/useRecorder";
import { useEffect, useState } from "react";
import { BiVideoOff, BiVolumeMute, BiMicrophone, BiMicrophoneOff, BiVideo, BiStopCircle } from "react-icons/bi";
import { FaPhone, FaUsers } from "react-icons/fa";
import EndCallModal from "./EndCallModal";
import { BsRecordCircle } from "react-icons/bs";
import { Toaster } from 'react-hot-toast';

export default function VideoSection({ onChatToggle, onParticipantsToggle, roomId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [modalTxt,setModalTxt] =useState("Please Allow Camera or Microhone From Browser");
  const socket = useSocket();
  useEffect(() => {
    localStorage.setItem('roomId', roomId);
  }, [roomId]);
  
  const { peer, myId } = usePeer();
  const ModalText = "Please Allow Camera or Microhone From Browser";
  const { stream } = useMediaStream(openModal,ModalText);

  const [users, setUsers] = useState([]);
  const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom
  } = usePlayer(myId, roomId, peer);

  const { recording, startRecording, stopRecording, status } = useRecorder(stream);

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser) => {
      const call = peer.call(newUser, stream);
      call.on("stream", (incomingStream) => {
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
        }));
      });
    };
    socket.on("user-connected", handleUserConnected);
    return () => socket.off("user-connected", handleUserConnected);
  }, [peer, setPlayers, socket, stream]);

  useEffect(() => {
    if (!socket) return;
    const handleToggleAudio = (userId) => {
      setPlayers((prev) => {
        const copy = { ...prev };
        copy[userId].muted = !copy[userId].muted;
        return copy;
      });
    };

    const handleToggleVideo = (userId) => {
      setPlayers((prev) => {
        const copy = { ...prev };
        copy[userId].playing = !copy[userId].playing;
        return copy;
      });
    };

    const handleUserLeave = (userId) => {
      users[userId]?.close();
      const playersCopy = { ...players };
      delete playersCopy[userId];
      setPlayers(playersCopy);
    };

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
        }));
      });
    });
  }, [peer, setPlayers, stream]);

  useEffect(() => {
    if (!stream || !myId) return;
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
        {playerHighlighted && (
          <div className="flex h-full w-full bg-black object-contain">
            <Player
              url={playerHighlighted.url}
              muted={playerHighlighted.muted}
              playing={playerHighlighted.playing}
              isActive
            />
          </div>
        )}
        {nonHighlightedPlayers && (
          <div className="bottom-20 absolute z-10 w-1/4 h-1/4 rounded-xl">
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
        )}
      </div>
      <div className="absolute bottom-0 backdrop-blur-2xl left-0 w-full p-4 flex justify-center space-x-4 bg-white">
        <button
          className="relative rounded-full"
          onClick={toggleAudio}
        >
          {playerHighlighted?.muted ? (
            <BiVolumeMute className="size-10 p-2 rounded-full text-white active:ring-4 ring-red-500/30 focus-within:ring-4 outline-none bg-red-600" />
          ) : (
            <BiMicrophone className="size-10 p-2 text-blue-500 rounded-full bg-blue-600/20 active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none " />
          )}
        </button>
        <button
          className="relative rounded-full size-10"
          onClick={toggleVideo}
        >
          {playerHighlighted?.playing ? (
            <BiVideo className="size-10 p-2 rounded-full text-blue-500 bg-blue-600/20 active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none" />
          ) : (
            <BiVideoOff className="size-10 p-2 rounded-full text-white active:ring-4 ring-red-500/30 focus-within:ring-4 outline-none bg-red-600" />
          )}
        </button>
        <CallButton
          icon={recording ? BiStopCircle : BsRecordCircle}
          onClick={recording ? stopRecording : startRecording}
          bgColor={recording ? "bg-red-500/20 " : "bg-blue-600/20 "}
          className={recording ? "animate-ping text-red-500" : "text-blue-500"}
        />
        
        <button
          className="relative rounded-full size-10 bg-blue-600/20 active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none "
        onClick={onChatToggle}
        >
          <img src="/doctor/frame/message.svg" alt="chat icon" className="size-10 p-2" />
        </button>
      
        <button
          className="relative rounded-full active:ring-4 text-blue-500 bg-blue-600/20 ring-blue-500/30 focus-within:ring-4 outline-none"
          onClick={onParticipantsToggle}
        >
          <FaUsers className="size-10 p-2 " />
          </button>
        <button
          onClick={() => {openModal(); setModalTxt("Are You Sure?")}}
          className="top-4 right-4 px-6 py-3 rounded-full text-white bg-red-500 active:ring-4 ring-red-500/30 focus-within:ring-4 outline-none"
        >
          <FaPhone />
        </button>
      </div>
      <Toaster />
      <EndCallModal ModalText={modalTxt} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

function CallButton({ icon: Icon, onClick, bgColor, className }) {
  return (
    <button
      className={`relative size-10 rounded-full ${bgColor} active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none`}
      onClick={onClick}
    >
      <Icon className={`size-10 p-2 ${className}`} />
    </button>
  );
}
