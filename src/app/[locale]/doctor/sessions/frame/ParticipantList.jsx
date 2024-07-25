import { FaUserPlus } from "react-icons/fa";

const ParticipantList = ({ participants }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Participants</h2>
        <button className="text-blue-500">
          <FaUserPlus size={24} />
        </button>
      </div>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id} className="mb-2">
            <div className="flex items-center">
              <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
              {participant.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
