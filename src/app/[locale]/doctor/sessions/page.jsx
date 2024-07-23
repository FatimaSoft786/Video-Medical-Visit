"use client";
import { Button, Avatar, Input } from "@nextui-org/react";
import { useState,useEffect,useCallback,useRef } from "react";
import { FaPhone } from "react-icons/fa";
import { getUserSession } from "@/utils/session";
import { BiClipboard, BiPhoneCall, BiPhoneOff, BiVideoOff, BiVolumeMute } from "react-icons/bi";
import { useSocket } from "../../../context/Context";
import ReactPlayer from "react-player";
import { CiStreamOn } from "react-icons/ci";
import peer from "@/app/service/peer";
  import RecordRTC from 'recordrtc';
import { v4 as uuid } from 'uuid'
import axios from "axios"
import { TiMediaRecordOutline } from "react-icons/ti";

function VideoSection() {
  const socket = useSocket();

  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

    const [recording, setRecording] = useState(false);
    const recorderRef = useRef(null);
    const [file, setFile] = useState('');



  //Set the room id and console the user had joined
  const handleUserJoined = useCallback(({ email, id }) => {
    setRemoteSocketId(id);
  }, []);

  
    const startRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    recorderRef.current = new RecordRTC(stream, { type: 'video' });
    recorderRef.current.startRecording();
    setRecording(true);
  };

  const stopRecording = () => {
    recorderRef.current.stopRecording(async () => {
      const blob = recorderRef.current.getBlob();
    //   await uploadRecording(blob);
    console.log(blob);
    const newUuid = uuid()
   // blobToFile(blob,"recordings.mp4");
   const file = blobToFile(blob, newUuid);
    setFile(file);
   uploadRecording(file);
      setRecording(false);
    });
  };

  const blobToFile = (blob, fileName) => {
  const file = new File([blob], fileName, { type: blob.type });
  return file;
};

  const uploadRecording = async (file) => {
    const formData = new FormData();
    formData.append('recording',file);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(
          "https://video-medical-backend-production.up.railway.app/api/recordings/uploadRecording",
          formData,
          config
        )
        .then((response) => {
          if (response.data.success === true) {
            console.log(response.data.message);
            
          } else {
            console.log(response.data.message);
        
          }
       
        })
        .catch((error) => {
            console.log(error.message);
          
        });
  };


  // After redirect to my room page first taking Permissions to user
  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);


  const handleEndUser =  () => {
    setMyStream(null);
    setRemoteStream(null);
  }

  const handleRoomDisconnect = () => {
    window.location.href = "/";
    stopRecording();
  }

  //Device A Taking User Information then send to Device B through offerr
  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  //push The Audio and video to peer connection & Listen
  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  //Negotiation work on that time when connection are slow to reconnecting
  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  //Negotiation means establish the essential connection like create offer, accept answer to know the 
  //capabilities of Device A send to B and Device B send to A
  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);
  return (
    <div className="flex flex-col w-[70%] h-full max-md:w-full rounded-xl overflow-hidden">
      <div className="relative bg-gray-200/20 px-2">
        {myStream ? (
            <>
              <ReactPlayer
               playing     
                width="100%"
                height="70vh"
                url={myStream}
              />
            </>
          ):(<img  src="/doctor/frame/Frameimg.svg" className="w-full"
           alt="Video call"/>)}
        
        <div className="absolute top-4 left-4 bg-gray-800/30 text-white rounded-2xl px-4 py-2 text-xs">
         
        </div>
        {/* <div className="absolute top-4 right-4 bg-gray-800/30 text-white rounded-2xl p-2 text-sm">
          <img src="/doctor/frame/fullscreen.svg" alt="" className="size-4" />
        </div> */}
        <div className="absolute bottom-4 left-4 bg-gray-800/30 text-white rounded-2xl px-4 py-2 text-sm">
        {remoteSocketId ? "Connected" : "No one in room"}
        </div>
        {/* <div className="absolute bottom-4 right-4 bg-gray-800/30 text-white rounded-2xl p-2 text-sm">
          <img src="/doctor/frame/voice.svg" alt="" className="size-4" />
        </div> */}
      </div>
      {/* <ParticipantsThumbnails /> */}
      <div className=" grid grid-cols-1 gap-4 rounded-xl my-2">
          <div className=" flex rounded-2xl">
               {remoteStream ? (
            <>
              <ReactPlayer
                playing 
                width="30%"
                height="20vh"
                url={remoteStream}
              />
            </>
          ):(<img  src="/doctor/frame/Frameimg.svg" className=" w-[30%] h-[20vh]"
           alt="Video call"/>)}
          </div>

      </div>
      <div className="flex justify-center relative items-center p-4 space-x-4">
      <div className="relative gap-4 flex items-center max-md:mr-6">
        {/* <button
      className="relative rounded-full active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none bg-blue-500"  >
      <img className="size-10 p-2 rounded-full"  src='/doctor/frame/mic.svg'/>
       {isMuteEnabled ? <img className="size-10 p-2 rounded-full"  src='/doctor/frame/mic.svg'/> : <BiVolumeMute className="size-10 p-2 rounded-full text-white"/>}
    </button> */}

    {/* <button
      className="relative rounded-full active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none bg-blue-500"  >
      <img className="size-10 p-2 rounded-full"  src='/doctor/frame/videoicon.svg'/> 
       {isVideoEnabled ? <img className="size-10 p-2 rounded-full"  src='/doctor/frame/videoicon.svg'/> : <BiVideoOff className="size-10 p-2 rounded-full text-white"/>}
    </button> */}

        
        {/* <CallButton icon="/doctor/frame/share.svg" /> */}
        {/* <button className="relative rounded-full active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none bg-red-500/20" >
          {recording ?  : }
        </button> */}
         {recording ? (
        <button  onClick={stopRecording}><TiMediaRecordOutline className="size-10 p-2 rounded-full text-red-500/200"/></button>
      ) : (
        <button onClick={startRecording}><img className="size-10 p-2 rounded-full text-white"  src="/doctor/frame/record.svg"/></button>
      )}
        {/* <CallButton /> */}
        {/* <CallButton icon="/doctor/frame/message.svg" />
        <CallButton icon="/doctor/frame/dots.svg" /> */}
        {myStream && <button className="relative rounded-full active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none bg-blue-500" onClick={sendStreams}>
        <CiStreamOn className="size-10 p-2 rounded-full text-white"/>
        </button>}
        {remoteSocketId && <button className="relative rounded-full active:ring-4 ring-blue-500/30 focus-within:ring-4 outline-none bg-blue-500"onClick={handleCallUser}>
            <BiPhoneCall className="size-10 p-2 rounded-full text-white"/>
        </button>}
      </div>
      <button onClick={handleRoomDisconnect} className="absolute flex items-center gap-2 px-6 right-4 py-3 rounded-3xl bg-red-500 text-white active:ring-4 ring-red-500/30 focus-within:ring-4 outline-none">
        <FaPhone className="size-4 max-lg:block hidden max-xl:hidden" />
        <div className="max-lg:hidden max-md:block">End Call</div>
      </button>
    </div>
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
   const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [file, setFile] = useState(null);

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

  const sendMessage = ()=>{
      if (messageInput.trim() !== "") {
           const message = { content: messageInput, timestamp: new Date(), name: profileData.firstName +" "+ profileData.lastName, picture: profileData.picture_url ? profileData.picture_url : profileData.default_picture_url, type: "text" };
           socket.emit("message", message);
           setMessageInput('');
        }
  }
  return(
  <div className=" flex flex-col h-full">
  <h3 className="text-lg font-semibold p-2"></h3>
 <div className=" flex-1">
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
 <div>
    <div className="flex items-center px-8 py-4 bg-white rounded-b-2xl">
      <div className="relative flex w-full items-center">
        <Input
          radius="full"
          size="lg"
          placeholder="Type Something..."
          className="flex-grow"
          value={messageInput}
           onChange={(e) => setMessageInput(e.target.value)}
          // startContent={<img src="/doctor/frame/fileupload.svg" />}
        />
        
        <button onClick={sendMessage} className="bg-blue-500 active:scale-80 transition-all rounded-full absolute right-0 p-2">
          <img src="/doctor/frame/send.svg" alt="" className="size-6" />
        </button>
      </div>
    </div>
 </div>
  </div>
  );
  // const [activeTab, setActiveTab] = useState("group");
  // const [hide, setHide] = useState(false);
  // return (
  //   <div className="transition-all duration-300 ease-soft-spring">
  //     <div className="flex items-center bg-white  justify-between max-lg:flex-col max-md:flex-row py-2 px-4 border-t rounded-b-2xl">
  //       <h3 className="text-lg font-semibold">Chats</h3>
  //       <div className="flex items-center gap-4">
  //         <div className="flex space-x-2 rounded-full bg-blue-500/10 p-2">
  //           <Button
  //             radius="full"
  //             className={`  px-4 ${
  //               activeTab === "group"
  //                 ? "bg-blue-600 text-white"
  //                 : "bg-transparent text-blue-500"
  //             }`}
  //             onClick={() => setActiveTab("group")}
  //           >
  //             Group
  //           </Button>
  //           <Button
  //             radius="full"
  //             className={`bg-transparent px-4 text-blue ${
  //               activeTab === "personal"
  //                 ? "bg-blue-600 text-white"
  //                 : "bg-transparent text-blue-500"
  //             }`}
  //             onClick={() => setActiveTab("personal")}
  //           >
  //             Personal
  //           </Button>
  //         </div>
  //         <img
  //           src="/doctor/frame/navigation.svg"
  //           onClick={() => setHide(!hide)}
  //           className={`cursor-pointer ${hide ? "rotate-180" : ""}`}
  //           alt=""
  //         />
  //       </div>
  //     </div>
  //     {hide ? null : <ChatContent activeTab={activeTab} />}
  //   </div>
  // );
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

 // const messages = activeTab === "group" ? groupMessages : personalMessages;

  return (
     <div className="flex flex-col h-full">

          <div className="flex h-[90%] bg-gray-200 p-2 overflow-y-auto">
           
          </div>
          <div className="p-2 border-t border-gray-300">
            <div className="flex">
            <div>
  <label htmlFor="myInput"><span style={{ fontSize: '20px'}} type="camera" />File</label>
  <input
    id="myInput"
    style={{display:'none'}}
    type={"file"}
    onChange={(e) => setFile(e.target.files[0])}
  />
</div>
              <input
                type="text"
                className="w-full px-2 py-1 border rounded-l-md outline-none"
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>






    // <div className="flex flex-col space-y-2 p-4 overflow-y-auto">
    //   {messages.map((msg, index) => (
    //     <ChatMessage key={index} message={msg} />
    //   ))}
    //   <ChatInput />
    // </div>
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
