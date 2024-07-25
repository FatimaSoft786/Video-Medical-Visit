import { motion } from "framer-motion";

const VideoPanel = ({ participant }) => {
  return (
    <motion.div className="relative w-full h-full bg-gray-200 rounded-lg">
      <video className="w-full h-full object-cover rounded-lg" />
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
        {participant.name}
      </div>
    </motion.div>
  );
};

export default VideoPanel;
