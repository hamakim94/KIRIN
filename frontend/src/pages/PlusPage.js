import React, { useEffect, useRef, useState } from "react";
import styles from "./PlusPage.module.css";
import RecordRTC, { invokeSaveAsDialog } from "recordrtc";

function PlusPage() {
  const [stream, setStream] = useState(null);
  const [blob, setBlob] = useState(null);
  const refVideo = useRef(null);
  const recorderRef = useRef(null);

  const handleRecording = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: "100vw",
        height: "100vh",
        frameRate: 30,
      },
      audio: false,
    });

    setStream(mediaStream);
    recorderRef.current = new RecordRTC(mediaStream, { type: "video" });
    recorderRef.current.startRecording();
  };

  const handleStop = () => {
    recorderRef.current.stopRecording(() => {
      setBlob(recorderRef.current.getBlob());
    });
  };

  const handleSave = () => {
    invokeSaveAsDialog(blob);
  };

  useEffect(() => {
    if (!refVideo.current) {
      return;
    }
    setBlob(recorderRef.current.getBlob());
    // refVideo.current.srcObject = stream;
  }, [stream, refVideo]);

  useEffect(() => {
    const start = async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: "100vw",
          height: "100vh",
          frameRate: 30,
        },
        audio: false,
      });

      setStream(mediaStream);
      recorderRef.current = new RecordRTC(mediaStream, { type: "video" });
      console.log(mediaStream);
      console.log("첫 미리보기");
    };
    start();
    return () => {
      console.log("화면나갔어");
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      <button onClick={handleRecording}>start</button>
      <button onClick={handleStop}>stop</button>
      <button onClick={handleSave}>save</button>
      {blob && (
        <video
          src={URL.createObjectURL(blob)}
          controls
          autoPlay
          style={{ width: "100%", height: "100%" }}
        />
      )}
      {!blob && <video src={stream} controls autoPlay style={{ width: "100%", height: "100%" }} />}
    </div>
  );
}

export default PlusPage;
