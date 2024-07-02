import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";

const JitsiMeetComponent = ({ roomId }) => {
  const roomName = "Video Medical Visit";
  const domain = "meet.jit.si";

  const configOverwrite = {
    startWithAudioMuted: true,
    startWithVideoMuted: true,
    disableDeepLinking: true,
    disableThirdPartyRequests: true,
    prejoinPageEnabled: false,
    enableWelcomePage: false,
    enableClosePage: true,
    enableInsecureRoomNameWarning: true,
    enableNoisyMicDetection: true,
    resolution: 720,
  };

  return (
    <div style={{ height: "100vh", flexDirection: "column", display: "grid",zIndex:1000 }}>
      <JitsiMeeting
        roomName={roomName}
        displayName="Shahzaib"
        domain={domain}
        
        configOverwrite={configOverwrite}
        containerStyle={{ flex: 1, display: "flex" }}
      />
    </div>
  );
};

export default JitsiMeetComponent;
