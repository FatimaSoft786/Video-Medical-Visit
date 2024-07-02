import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhone,
} from "react-icons/fa";
import { useState } from "react";

const Controls = () => {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  return (
    <div className="flex justify-center space-x-4 p-4 bg-gray-100 rounded-lg">
      <button onClick={() => setMicOn(!micOn)} className="text-gray-700">
        {micOn ? <FaMicrophone size={24} /> : <FaMicrophoneSlash size={24} />}
      </button>
      <button onClick={() => setCamOn(!camOn)} className="text-gray-700">
        {camOn ? <FaVideo size={24} /> : <FaVideoSlash size={24} />}
      </button>
      <button className="text-red-500">
        <FaPhone size={24} />
      </button>
    </div>
  );
};

export default Controls;
