import React, { useEffect, useRef, useState } from "react";
import styles from "./PlusPage.module.css";
import RecordRTC, { invokeSaveAsDialog } from "recordrtc";
import dummy from "../assets/sound/dummy.mp3";

function PlusPage() {
  const [stream, setStream] = useState(null);
  const [blob, setBlob] = useState(null);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [pause, setPause] = useState(false);
  const refVideo = useRef(null);
  const recorderRef = useRef(null);
  const [number, setNumber] = useState(null);
  const [waitButton, setWaitButton] = useState(false);
  const [changeCam, setChangeCam] = useState("user");
  const [mp3, setMp3] = useState(null);
  useInterval(
    () => {
      if (waitButton) {
        setNumber((number - 0.1).toFixed(1));
      }
    },
    number < 0 ? null : 100
  );

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => {
          setNumber(15);
          setWaitButton(false);
          clearInterval(id);
        };
      }
    }, [delay]);
  }

  const handleRecording = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        frameRate: 30,
        facingMode: changeCam,
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
    mp3.currentTime = 0;
    mp3.play();
    setToggleBtn(true);
  };

  const handlePause = () => {
    recorderRef.current.pauseRecording();
    setToggleBtn(false);
    setPause(true);
    mp3.pause();
  };

  const handleResume = () => {
    recorderRef.current.resumeRecording();
    setToggleBtn(true);
    mp3.play();
  };

  const handleStop = () => {
    recorderRef.current.stopRecording(() => {
      setBlob(recorderRef.current.getBlob());
      refVideo.current.srcObject = null;
    });
    mp3.pause();
  };

  const handleSave = () => {
    invokeSaveAsDialog(blob);
  };

  const handleDirection = () => {
    if (stream) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
    if (changeCam === "user") {
      console.log("유저유저");
      setChangeCam({ exact: "environment" });
      let mediaStream;
      const start = async () => {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            frameRate: 30,
            facingMode: { exact: "environment" },
          },
          audio: false,
        });
        setStream(mediaStream);
        refVideo.current.srcObject = mediaStream;
        console.log("망했다");
      };
      start();
    } else {
      console.log("후면후면");
      setChangeCam("user");
      let mediaStream;
      const start = async () => {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            frameRate: 30,
            facingMode: "user",
          },
          audio: false,
        });
        setStream(mediaStream);
        refVideo.current.srcObject = mediaStream;
        console.log(refVideo.current.srcObject);
      };
      start();
    }
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
          frameRate: 30,
          facingMode: "user",
        },
        audio: false,
      });
      setStream(mediaStream);
    };
    start();
    setNumber(15);
    setMp3(new Audio(dummy));
    return () => {
      if (stream) {
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.coverBox}>
        <button className={styles.recordBtn} onClick={handleSave}>
          save
        </button>
        {toggleBtn ? (
          <>
            <button className={styles.recordBtn} onClick={handlePause}>
              pause
            </button>
            <button onClick={handleStop}>체크체크</button>
          </>
        ) : (
          <>
            <button className={styles.recordBtn} onClick={pause ? handleResume : handleRecording}>
              start
            </button>
            <button onClick={() => setWaitButton(true)}>{number}</button>
            <button onClick={handleDirection}>전환</button>
          </>
        )}
      </div>

      {/* {blob ? (
        <video
          src={URL.createObjectURL(blob)}
          controls
          autoPlay
          loop
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <video controls autoPlay ref={refVideo} style={{ width: "100%", height: "100%" }} />
      )} */}
      <video controls autoPlay ref={refVideo} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default PlusPage;
