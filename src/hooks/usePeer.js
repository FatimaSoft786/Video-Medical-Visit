// import { useSocket } from "@/app/context/SocketContext";
import { useRouter } from "next/navigation"
import { useSocket } from "@/app/context/Context";

const { useState, useEffect, useRef } = require("react")

const usePeer = () => {
     const socket = useSocket();
     const [roomId, setRoomId] = useState('')
    const [peer, setPeer] = useState(null)
    const [myId, setMyId] = useState('')
    const isPeerSet = useRef(false)

    useEffect(() => {
        setRoomId(localStorage.getItem('roomId'));
        if(roomId){
            console.log("room id =>",roomId);
 if (isPeerSet.current || !roomId || !socket) return;
        isPeerSet.current = true;
        let myPeer;
        (async function initPeer() {
            myPeer = new (await import('peerjs')).default()
            setPeer(myPeer)

            myPeer.on('open', (id) => {
                console.log(`your peer id is ${id}`)
                setMyId(id)
                socket?.emit('join-room', roomId, id)
            })//
        })()
        }
    }, [roomId, socket])

    return {
        peer,
        myId
    }
}

export default usePeer;