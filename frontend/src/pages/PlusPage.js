import React, { useEffect, useRef, useState } from "react";
import styles from "./PlusPage.module.css";
import RecordRTC, { invokeSaveAsDialog } from "recordrtc";

function PlusPage() {
  const [stream, setStream] = useState(null);
  const [blob, setBlob] = useState(null);
  const [toggleBtn, setToggleBtn] = useState(false);
  const refVideo = useRef(null);
  const recorderRef = useRef(null);

  const handleRecording = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 720,
        height: 1280,
        frameRate: 30,
      },
      audio: false,
    });

    if (blob) {
      setBlob(null);
    }

    setStream(mediaStream);
    recorderRef.current = new RecordRTC(mediaStream, {
      type: "video",
      mimeType: "video/webm;codecs=vp9",
    });
    recorderRef.current.startRecording();
    setToggleBtn(true);
  };

  const handleStop = () => {
    recorderRef.current.stopRecording(() => {
      setBlob(recorderRef.current.getBlob());
      refVideo.current.srcObject = null;
    });
    setToggleBtn(false);
  };

  const handleSave = () => {
    invokeSaveAsDialog(blob);
  };

  useEffect(() => {
    if (!refVideo.current) {
      return;
    }
    refVideo.current.srcObject = stream;
  }, [stream, refVideo]);

  useEffect(() => {
    let mediaStream;
    const start = async () => {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 720,
          height: 1280,
          frameRate: 30,
        },
        audio: false,
      });
      setStream(mediaStream);
    };
    start();
    return () => {
      console.log("화면나갔어12");
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.coverBox}>
        {toggleBtn ? (
          <button className={styles.recordBtn} onClick={handleStop}>
            stop
          </button>
        ) : (
          <button className={styles.recordBtn} onClick={handleRecording}>
            start
          </button>
        )}
      </div>
      {/*
      <button className={styles.recordBtn} onClick={handleSave}>
        save
      </button> */}
      {blob ? (
        <video src={URL.createObjectURL(blob)} autoPlay style={{ width: "100%", height: "100%" }} />
      ) : (
        <video autoPlay ref={refVideo} style={{ width: "100%", height: "100%" }} />
      )}
    </div>
  );
}

export default PlusPage;
