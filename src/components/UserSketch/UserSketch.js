// import React, { useEffect, useState } from 'react';
// import p5 from 'p5';
// import 'p5/lib/addons/p5.sound';
// import './UserSketch.scss';

// ///OLD WAY MIGHT TEST TO SEE IF I CAN COMBINE BOTH
// export default function UserSketch(props) {
//   const { audioURL, imageURL } = props;

//   useEffect(() => {
//     const sketch = (p) => {
//       let fft;
//       let song;
//       let img;
//       let analyser;
//       let audioContext;
//       let source;
//       let canvasWidth = window.innerWidth;
//       let canvasHeight = window.innerHeight;

//       //Loading new user's audio file
//       song = new Audio(audioURL);
//       //Loading new user's image file
//       // img = new window.p5.Image();
//       // img.src = imageURL;

//       //Test audio
//       if (!song) {
//         return;
//       } else {
//         song.play();
//       }

//       p.preload = () => {};

//       p.setup = () => {
//         p.createCanvas(canvasWidth, canvasHeight);
//         fft = new window.p5.FFT(0.3);

//         audioContext = new (window.AudioContext || window.webkitAudioContext)();
//         analyser = audioContext.createAnalyser();
//         analyser.fftSize = 256; // Adjust the FFT size as needed

//         source = audioContext.createMediaElementSource(
//           document.getElementById('audioElement')
//         );
//         source.connect(analyser);
//         analyser.connect(audioContext.destination);

//         // Start playing the audio
//         document.getElementById('audioElement').src = audioURL;
//         document.getElementById('audioElement').play();
//       };

//       p.draw = () => {
//         p.background(0);
//         p.stroke(255);

//         const bufferLength = analyser.frequencyBinCount;
//         const audioData = new Uint8Array(bufferLength);
//         analyser.getByteTimeDomainData(audioData);

//         p.beginShape();
//         for (let i = 0; i < bufferLength; i++) {
//           const x = p.map(i, 0, bufferLength, canvasWidth);
//           const y = p.map(audioData[i], 0, 255, 0, canvasHeight);

//           p.vertex(x, y);
//         }
//         p.endShape();
//       };
//     };

//     new p5(sketch); // Create a new p5.js sketch
//   }, [audioURL]);

//   return (
//     <div className="user-sketch">
//       <audio className="user-sketch__audio" id="audioElement" controls></audio>
//     </div>
//   );
// }
