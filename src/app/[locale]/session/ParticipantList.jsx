import { useState } from "react";
import { Button, Avatar } from "@nextui-org/react";

export default function ParticipantList() {
  const [showList, setShowList] = useState(false);
  const participants = [
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
  ];

  return (
    <div className={`fixed backdrop-blur-3xl top-0 right-[30%] w-[30%] max-md:mt-12 max-md:right-3/4 max-md:w-fit min-h-fit bg-gray-200/20 rounded-lg shadow-xl transition-transform translate-x-full ${showList && "!border-xl"}`}>
      <div className={`flex items-center justify-between bg-white/50 backdrop-blur-3xl px-6 py-3 rounded-t-xl ${!showList && "!rounded-b-xl"}`}>
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
          className={`cursor-pointer transition-transform ${showList ? "rotate-180" : ""}`}
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
    </div>
  );
}

function ParticipantItem({ participant }) {
  return (
    <div className="flex items-center justify-between bg-white w-full px-6 py-3 rounded-full">
      <div className="flex space-x-2 items-center">
        <Avatar className="size-12" src={participant.avatar} />
        <span className="text-sm font-medium">{participant.name}</span>
      </div>
      <div className="flex space-x-2">
        <img src={participant.mic} className="size-6" />
        <img src={participant.video} className="size-6" />
      </div>
    </div>
  );
}
