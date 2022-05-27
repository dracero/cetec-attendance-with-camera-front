// import logo from './logo.svg';
import './App.css';

import { React, useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-cpu";

import * as blazeface from "@tensorflow-models/blazeface";

const width = 400;
const height = 300;

const drawFaceContainer = (ctx, detections) => {
  detections.forEach((detection) => {
    const { topLeft, bottomRight } = detection;
    const start = topLeft;
    const end = bottomRight;
    const size = [end[0] - start[0], end[1] - start[1]];
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    ctx.fillRect(start[0], start[1], size[0], size[1]);

    if (true) {
      const landmarks = detection.landmarks;

      ctx.fillStyle = "blue";
      for (let j = 0; j < landmarks.length; j++) {
        const x = landmarks[j][0];
        const y = landmarks[j][1];
        ctx.fillRect(x, y, 5, 5);
      }
    }
  });
};

function App() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const cxtRef = useRef();

  const [faceCount, setFaceCount] = useState(0);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  useEffect(() => {
    const timerIntervalId = setInterval(() => {
      (async () => {
        const model = await blazeface.load();
        const returnTensors = !true;

        if (
          webcamRef.current !== null &&
          webcamRef.current.video.readyState === 4 &&
          webcamRef.current !== undefined
        ) {
          const { video } = webcamRef.current;
          const { videoWidth, videoHeight } = video;
          cxtRef.current.width = videoWidth;
          cxtRef.current.height = videoHeight;

          const detections = await model.estimateFaces(video, returnTensors);

          const cxt = cxtRef.current.getContext("2d");

          setFaceCount(detections.length);

          drawFaceContainer(cxt, detections);
        }
      })();
    }, 100);

    return () => {
      clearInterval(timerIntervalId);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="counter">
          Faces: {faceCount}
        </div>
        <div id="container">
          <Webcam
            id="cam"
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              height: height,
              width: width
            }}
          />
          <canvas
            id="gameCanvas"
            ref={cxtRef}
            width={width.toString()}
            height={height.toString()}
          ></canvas>
        </div>
        <button onClick={capture} disabled={!faceCount}>
          Capture photo
        </button>
        {imgSrc && <img alt="img" src={imgSrc} />}
      </header>
    </div>
  );
}

export default App;
