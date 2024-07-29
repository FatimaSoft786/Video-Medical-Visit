import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const useMediaStream = (openModal,ModalText="Please Allow Audio or Video From Browser") => {
  const [state, setState] = useState(null);
  const isStreamSet = useRef(false);
  useEffect(() => {
    if (isStreamSet.current) return;
    isStreamSet.current = true;
    (async function initStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        console.log('setting your stream');
        setState(stream);
      } catch (e) {
        console.log('Error in media navigator', e);
        toast.error('Permission denied for audio or video. Please enable them to continue.');
        openModal();
      }
    })();
  }, [openModal]);

  return {
    stream: state,
  };
};

export default useMediaStream;
