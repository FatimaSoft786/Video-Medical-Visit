import axios from "axios";

const addFavorite = async (doctorId, patientId, token) => {
  try {
    const response = await axios.post(
      "https://video-medical-backend-production.up.railway.app/api/user/like",
      { doctorId, patientId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    return null;
  }
};

const deleteFavorite = async (doctorId, token) => {
  try {
    const response = await axios.delete(
      "https://video-medical-backend-production.up.railway.app/api/user/deleteFavoriteByPatient",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { doctorId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting favorite:", error);
    return null;
  }
};

export { addFavorite, deleteFavorite };
