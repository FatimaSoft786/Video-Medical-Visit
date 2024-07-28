import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const useRecorder = (stream) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [status, setStatus] = useState("idle");
  const chunks = useRef([]);

  const startRecording = () => {
    if (stream) {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunks.current, { type: 'video/mp4' });
        chunks.current = [];
        const file = blobToFile(blob, "recording.mp4");
        await uploadRecording(file);
        setStatus("stopped");
      };

      recorder.start();
      setRecording(true);
      setStatus("recording");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setStatus("stopping");
    }
  };

  const blobToFile = (blob, fileName) => {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  };

  const uploadRecording = async (file) => {
    const formData = new FormData();
    formData.append('recording', file);

    try {
      const response = await axios.post(
        "https://video-medical-backend-production.up.railway.app/api/recordings/uploadRecording",
        formData,
        {
          headers: { "content-type": "multipart/form-data" }
        }
      );
      if (response.data.success === true) {
        toast.success(`Uplaod Stream video`);
      } else {
        toast.error(`Error Uploading Video`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { recording, startRecording, stopRecording, status };
};

export default useRecorder;
