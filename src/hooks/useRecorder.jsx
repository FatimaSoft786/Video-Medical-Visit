// useRecorder.js
import { useState, useRef } from "react";

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

      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'video/webm' });
        chunks.current = [];
        const url = URL.createObjectURL(blob);
        downloadRecording(url);
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

  const downloadRecording = (url) => {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: block';
    a.href = url;
    a.download = 'recording.mp4';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return { recording, startRecording, stopRecording, status };
};

export default useRecorder;
