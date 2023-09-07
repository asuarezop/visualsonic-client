import React, { useEffect, useState } from "react";
import Sketch from "react-p5";
import p5 from "p5";
import "p5/lib/addons/p5.sound";
import "./UserSketch.scss";

///OLD WAY MIGHT TEST TO SEE IF I CAN COMBINE BOTH
export default function UserSketch(props) {
  const { audioURL, imageURL } = props;

  useEffect(() => {
    const sketch = (p) => {
      let fft;
      let song;
      let img;
      let canvasWidth = window.innerWidth;
      let canvasHeight = window.innerHeight;

      //Loading new user's audio file
      song = new Audio(audioURL);

      //Loading new user's image file
      // img = new window.p5.Image();
      // img.src = imageURL;

      //Test audio
      if (!song) {
        return;
      } else {
        song.play();
      }

      p.preload = () => {};

      p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
        fft = new window.p5.FFT(0.3);
      };

      p.draw = () => {
        p.background(0);
        p.stroke(255);

        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256; // Adjust the FFT size as needed

        const audioElement = document.getElementById("audioElement");
        const source = audioContext.createMediaElementSource(audioElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        // Get the audio data from the audio element
        const bufferLength = analyser.frequencyBinCount;
        const audioData = new Uint8Array(bufferLength);

        // Get the audio data from the analyser
        analyser.getByteTimeDomainData(audioData);

        audioElement.src = audioURL;
        audioElement.play();

        p.beginShape();
        for (let i = 0; i < bufferLength; i++) {
          const x = p.map(i, 0, bufferLength, 0, canvasWidth);
          const y = p.map(audioData[i], 0, 255, 0, canvasHeight);

          //change the line shape of waveform
          p.vertex(x, y);
        }
        p.endShape();
      };
    };

    new p5(sketch); // Create a new p5.js sketch
  }, [audioURL]);

  return (
    <div className="user-sketch">
      <audio className="user-sketch__audio" id="audioElement" controls></audio>
    </div>
  );
}
