// import logo from './logo.svg';
import './App.css';

import { React, useEffect, useRef, useState, useCallback } from 'react';
import Webcam from "react-webcam";

import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-cpu';

import * as blazeface from '@tensorflow-models/blazeface';

const drawFaceContainer = (ctx, detections) => {

  detections.forEach((detection) => {
    // do the magic
    const { topLeft, bottomRight } = detection;
    const size = [bottomRight[0] - topLeft[0], bottomRight[1] - topLeft[1]];
    // Draw a circle around the face of each person
    ctx.beginPath();
    const x = bottomRight[0] - bottomRight[0] * 0.25;
    const y = topLeft[1] + topLeft[1] * 0.3;
    const radius = size[0] * 0.6;
    ctx.lineWidth = "3";
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "green";
    ctx.stroke();
  });
};

function App() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const cxtRef = useRef({current: {width: 256, height: 144}});

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
        WEBCAM CAPTURE
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={256}
          height={144}
        />
        <canvas className="app__canvas" ref={cxtRef}></canvas>
        <button onClick={capture}>Capture photo</button>
        {imgSrc && (
          <img alt="img" src={imgSrc}/>
        )}
      </header>
    </div>
  );
}

export default App;
