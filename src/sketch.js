import React from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import songFile from "./assets/sounds/09 Underwater Echo.mp3";

//REACT-P5 METHOD (WORKS WITH SOUND LIBRARY)

//All variables used for below functions must be declared outside the component
let x = 50;
let y = 50;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
let song;

function P5Sketch(props) {
  const preload = (p5) => {
    song = p5.loadSound(songFile);
  };

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(windowWidth, windowHeight).parent(canvasParentRef);

    p5.noLoop();
  };

  const draw = (p5) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    x++;
  };

  const mouseClicked = (p5) => {
    if (!song.isPlaying() && song.isLoaded()) {
      song.play();
    } else if (song.isPlaying()) {
      song.pause();
    }
  };

  return (
    <Sketch
      preload={preload}
      setup={setup}
      draw={draw}
      mouseClicked={mouseClicked}
    />
  );
}

export default P5Sketch;
