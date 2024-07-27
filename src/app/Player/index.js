import ReactPlayer from "react-player";
import cx from "classnames";
import { Mic, MicOff, UserSquare2 } from "lucide-react";

import styles from "./index.module.css";

const Player = (props) => {
  const { url, muted, playing, isActive } = props;
  return (
    <div className=" w-full h-full object-cover">
      {playing ? (
        <ReactPlayer
          url={url}
          muted={muted}
          playing={playing}
          width="100%"
          height="100%"
        />
      ) : (
        <div className=" flex w-full h-full justify-center items-center">
<UserSquare2 className={`text-white text-center items-center size-20`} />
        </div>
      )}
      {!isActive ? (
        muted ? (
          <MicOff className={styles.icon} size={20} />
        ) : (
          <Mic className={styles.icon} size={20} />
        )
      ) : undefined}
    </div>
  );
};

export default Player;
