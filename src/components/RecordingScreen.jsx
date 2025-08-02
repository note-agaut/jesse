import React, { useState, useRef, useEffect } from "react";
import {
  CameraRotate,
  Timer,
  MagicWand,
  Microphone,
  SlidersHorizontal,
  Gauge,
  Smiley,
  Image,
  X,
  Check,
} from "@phosphor-icons/react";
import "./RecordingScreen.css";
import { useNavigationStore } from "../store/useNavigationStore"; // add this import

export default function RecordingScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  const [recordTime, setRecordTime] = useState(0); // seconds
  const [progress, setProgress] = useState(0); // 0 to 1
  const [isPaused, setIsPaused] = useState(false); // NEW
  const [showCancelModal, setShowCancelModal] = useState(false); // Add this state
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const setPage = useNavigationStore((state) => state.setPage); // add this line

  const MAX_RECORD_SECONDS = 15; // Set your max recording time here

  // Start camera when component mounts
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        alert("Could not access camera: " + err.message);
      }
    }
    startCamera();
    return () => {
      // Cleanup: stop all tracks
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // Only run once

  // Attach stream to video element
  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  // Handle recording timer and progress
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordTime((prev) => {
          if (prev + 0.1 >= MAX_RECORD_SECONDS) {
            clearInterval(timerRef.current);
            doneRecording();
            return MAX_RECORD_SECONDS;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, [isRecording, isPaused]); // <-- add isPaused here

  useEffect(() => {
    setProgress(Math.min(recordTime / MAX_RECORD_SECONDS, 1));
  }, [recordTime]);

  // Start recording
  function startRecording() {
    setRecordedChunks([]);
    setIsRecording(true);
    setIsPaused(false); // NEW
    const recorder = new window.MediaRecorder(mediaStream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current = recorder;
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };
    recorder.start();
  }

  // Pause/Resume logic
  function togglePauseRecording() {
    if (!mediaRecorderRef.current) return;
    if (isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    } else {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  }

  // Stop recording and save video
  function stopRecording() {
    setIsRecording(false);
    setIsPaused(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        setRecordedVideoUrl(URL.createObjectURL(blob));
      };
    }
  }

  function cancelRecording() {
    setIsRecording(false);
    setIsPaused(false);
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
    setRecordedChunks([]);
    setRecordedVideoUrl(null);
  }

  function doneRecording() {
    if (!isRecording || isPaused) return;
    stopRecording();
    // Add your done logic here (e.g., upload or save)
  }

  // Add a ref to track if the pause was triggered by the modal
  const pauseByModalRef = useRef(false);

  // Pause recording when modal opens, resume if closed and not paused by user
  useEffect(() => {
    if (showCancelModal && isRecording && !isPaused) {
      pauseByModalRef.current = true;
      togglePauseRecording();
    } else if (
      !showCancelModal &&
      isRecording &&
      isPaused &&
      pauseByModalRef.current
    ) {
      // Only resume if the pause was triggered by the modal, not by user
      togglePauseRecording();
      pauseByModalRef.current = false;
    }
    // eslint-disable-next-line
  }, [showCancelModal]);

  return (
    <div className="text-white overflow-hidden">
      <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Camera Preview */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ background: "#222" }}
        />

        {/* Top Controls */}
        {(!isRecording ||
          isPaused ||
          (isRecording && recordTime >= MAX_RECORD_SECONDS)) && (
          <div className="absolute top-5 left-4 right-4 flex justify-between items-start z-20">
            {/* Button container for Cancel and Add Sound */}
            <div className="flex items-center w-full">
              <div className="flex-1 flex justify-start">
                <button
                  onClick={() => {
                    // Stop all media tracks before navigating away
                    if (mediaStream) {
                      mediaStream.getTracks().forEach((track) => track.stop());
                    }
                    setPage("home");
                  }}
                >
                  <X className="w-6 h-6" weight="bold" />
                </button>
              </div>
              <div className="flex-1 flex justify-center">
                <button className="add-sound text-sm font-semibold whitespace-nowrap">
                  Add Sound
                </button>
              </div>
              <div className="flex-1 flex justify-end">
                {/* Empty for spacing, or add more buttons if needed */}
              </div>
            </div>
            {/* Filters (right side) */}
            <div className="flex flex-col space-y-4">
              <button className="flex flex-col items-center justify-center">
                <CameraRotate className="text-2xl mb-1" weight="regular" />
                <span className="text-xs">Flip</span>
              </button>

              <button className="flex flex-col items-center justify-center">
                <Gauge className="text-2xl mb-1" weight="regular" />
                <span className="text-xs">Speed</span>
              </button>

              <button className="flex flex-col items-center justify-center">
                <SlidersHorizontal className="text-2xl mb-1" weight="regular" />
                <span className="text-xs">Filters</span>
              </button>

              <button className="flex flex-col items-center justify-center">
                <MagicWand className="text-2xl mb-1" weight="regular" />
                <span className="text-xs">Beautify</span>
              </button>

              <button className="flex flex-col items-center justify-center">
                <Timer className="text-2xl mb-1" weight="regular" />
                <span className="text-xs">Timer</span>
              </button>

              <button className="flex flex-col items-center justify-center">
                <Microphone className="text-2xl mb-1" weight="regular" />
                <span className="text-xs">Mic</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="px-6 py-4">
            {/* Main Controls */}
            <div className="flex justify-center items-center mb-6 space-x-8">
              {/* Show Effects, Recording, and Upload buttons in one row when not recording */}
              {!isRecording && (
                <>
                  <button className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center">
                      <Smiley
                        className="w-12 h-12 text-indigo-300"
                        weight="fill"
                      />
                    </div>
                    <span className="text-xs text-white">Effects</span>
                  </button>
                  {/* Recording Button with Progress */}
                  <button
                    className="record-button w-20 h-20 rounded-full flex items-center justify-center relative"
                    onClick={() => {
                      if (mediaStream) startRecording();
                    }}
                    disabled={!mediaStream}
                  >
                    {/* Progress ring */}
                    <svg
                      className="record-progress-ring"
                      width="80"
                      height="80"
                      viewBox="0 0 80 80"
                    >
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="4"
                        opacity="0"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="4"
                        strokeDasharray={2 * Math.PI * 36}
                        strokeDashoffset={2 * Math.PI * 36 * (1 - progress)}
                        style={{
                          transition: "stroke-dashoffset 0.1s linear",
                        }}
                      />
                    </svg>
                    <div className="record-inner"></div>
                  </button>
                  <button className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image className="w-12 h-12 text-sky-400" weight="fill" />
                    </div>
                    <span className="text-xs text-white">Upload</span>
                  </button>
                </>
              )}

              {/* Show only recording, done, and cancel buttons when recording */}
              {isRecording && (
                <>
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center"
                    disabled={false}
                  >
                    <X className=" text-white text-[20px]" />
                  </button>
                  {/* Recording Button with Progress (pause only) */}
                  {/* Hide the pause button if time is up or paused */}
                  {recordTime < MAX_RECORD_SECONDS && !isPaused && (
                    <button
                      className={`record-button w-20 h-20 rounded-full flex items-center justify-center relative`}
                      onClick={() => {
                        if (!isPaused) togglePauseRecording();
                      }}
                      aria-pressed={isPaused}
                      disabled={isPaused}
                    >
                      {/* Progress ring */}
                      <svg
                        className="record-progress-ring"
                        width="80"
                        height="80"
                        viewBox="0 0 80 80"
                      >
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="4"
                          opacity="0.3"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="4"
                          strokeDasharray={2 * Math.PI * 36}
                          strokeDashoffset={2 * Math.PI * 36 * (1 - progress)}
                          style={{
                            transition: "stroke-dashoffset 0.1s linear",
                          }}
                        />
                      </svg>
                      <div className="record-inner"></div>
                      <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs">
                        Pause
                      </span>
                    </button>
                  )}
                  <button
                    onClick={doneRecording}
                    className={`w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center ${
                      isPaused ? "" : "opacity-50 pointer-events-none"
                    }`}
                    disabled={!isPaused}
                  >
                    <Check className=" text-white text-[20px]" />
                  </button>
                </>
              )}
            </div>

            {/* Mode Selection and other controls hidden during recording */}
            {!isRecording && (
              <div className="flex justify-center space-x-8 mb-4">
                <button className="text-white font-medium">Video</button>
                <button className="text-gray-400">Post</button>
              </div>
            )}
          </div>
        </div>

        {/* Timer in center when recording */}
        {isRecording && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <span
              className="text-white text-4xl font-bold px-6 py-3 rounded-lg"
              style={{ letterSpacing: "0.1em" }}
            >
              {String(Math.floor(recordTime)).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-80 flex flex-col items-center">
            <div className="mb-4 text-lg font-semibold text-white">
              End recording session?
            </div>
            <div className="mb-6 text-gray-300 text-center text-sm">
              Are you sure you want to end this recording? Your current video
              will be lost.
            </div>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 rounded bg-gray-700 text-white"
                onClick={() => setShowCancelModal(false)}
              >
                No, continue
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white"
                onClick={() => {
                  cancelRecording();
                  setShowCancelModal(false);
                }}
              >
                Yes, end session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
