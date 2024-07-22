"use client";
import { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { getUserSession } from "@/utils/session";
const SocketContext = createContext();
//const socket = io('https://video-medical-backend-production.up.railway.app/');
//console.log(socket);
const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isMuteEnabled, setIsMuteEnabled] = useState(true);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    const [profileData, setProfileData] = useState({});
  useEffect(() => {
    const { user } = getUserSession();
    if (user) {
      setProfileData(user.user_details);
      setName(user.user_details.firstName +" "+user.user_details.lastName)
      
    } else {
      console.error("No user details found in session"); 
    }
  }, []);
    
     useEffect(() => {
     
    const getDeviceMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })
    setStream(stream)
    if(myVideo.current){
       // console.log(myVideo.current);
      myVideo.current.srcObject = stream
    }
  }
  getDeviceMedia();
      //  socket.on('me', (id) => setMe(id));
       
        // socket.on('callUser', ({ from, name: callerName, signal }) => {
        //     setCall({ isReceivingCall: true, from, name: callerName, signal });
        //});
    }, []);


     const toggleVideo = () => {
        const enable = stream.getVideoTracks()[0].enabled;
        if(enable){
            setIsVideoEnabled(!isVideoEnabled);
              stream.getVideoTracks()[0].enabled = false; 
        }else{
              setIsVideoEnabled(!isVideoEnabled);
              stream.getVideoTracks()[0].enabled = true; 
        }
    // if (myVideo.current) {
    //   myVideo.current.getVideoTracks().forEach(track => {
    //     track.enabled = !track.enabled;
    //   });
    //   console.log(stream);
    //   setIsVideoEnabled(!isVideoEnabled);
    
  };


      const muteUnmute = () => {
        console.log("muteUnmute");
        const enabled = stream.getAudioTracks()[0].enabled;
        if (enabled) {
            stream.getAudioTracks()[0].enabled = false; // Mute
            setIsMuteEnabled(!isMuteEnabled);
        } else {
            stream.getAudioTracks()[0].enabled = true; // UnMute
            setIsMuteEnabled(!isMuteEnabled);
        }
    };


    
    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({ initiator: false, trickle: false, stream });
        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });
        peer.signal(call.signal);
        connectionRef.current = peer;
    };
    
    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });
        peer.on('signal', (data) => {
                socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });
        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;
    };
    
    const leaveCall = () => {
        socket.on("callEnded");
         setCallEnded(true);
    //      if (userVideo.current && userVideo.current.srcObject) {

        
    //   }
      
    };
   
    
    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            toggleVideo,
            isVideoEnabled,
            isMuteEnabled,
            muteUnmute
        }}
        >
            {children}
        </SocketContext.Provider>
    );
};
export { ContextProvider, SocketContext };
