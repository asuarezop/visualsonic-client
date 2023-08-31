import React from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import songFile from "./assets/sounds/09 Underwater Echo.mp3";
import imgFile from "./assets/images/Home Screen Background.jpg";

//REACT-P5 METHOD (WORKS WITH SOUND LIBRARY)

//All variables used for below functions must be declared outside the component

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
let song;
let img;
let fft;
let amp;
let particles = [];

function P5Sketch(props) {
  const preload = (p) => {
    p.soundFormats("mp3");
    song = p.loadSound(songFile);
    img = p.loadImage(imgFile);
  };

  const setup = (p, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);

    p.angleMode(p.DEGREES);

    p.imageMode(p.CENTER);

    p.rectMode(p.CENTER);

    fft = new window.p5.FFT(0.3);

    img.filter(p.BLUR, 5);
  };

  const draw = (p) => {
    p.background(0);
    p.stroke(255);
    p.noFill();

    let wave = fft.waveform();

    p.translate(canvasWidth / 2, canvasHeight / 2);

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    // x++;

    fft.analyze();

    amp = fft.getEnergy(20, 200);

    p.push();
    if (amp > 240) {
      p.rotate(p.random(-0.5, 0.5));
    }

    p.image(img, 0, 0, canvasWidth + 100, canvasHeight + 100);
    p.pop();

    let alpha = p.map(amp, 0, 255, 180, 150);
    p.fill(0, alpha);
    p.noStroke();
    p.rect(0, 0, canvasWidth, canvasHeight);

    p.stroke(255);
    p.strokeWeight(3);
    p.noFill();

    for (let t = -1; t <= 1; t += 2) {
      p.beginShape();

      for (let i = 0; i < 180; i += 0.5) {
        //Specifiying to use the audio of the waveform as index, must be converted to an integer
        let index = p.floor(p.map(i, 0, canvasWidth, 180, wave.length - 1));

        //r (radius) mapped to wave index, with minimum and maximum radians of circle in last two arguments
        let r = p.map(wave[index], -1, 1, 150, 350);

        //x position be equal to radius(r) times sin(), times (t) variable to create both sides of visualizer
        let x = r * p.sin(i) * t;
        //y position be equal to radius(r) times cos(), polar coordinates Y
        let y = r * p.cos(i);
        //change the line shape of waveform
        p.vertex(x, y);
      }
      p.endShape();
    }

    let particle = new Particle(p);
    particles.push(particle);

    for (let i = particles.length - 1; i >= 0; i--) {
      if (!particles[i].edges()) {
        particles[i].update(amp > 240, p);
        particles[i].show(p);
      } else {
        particles.splice(i, 1);
      }
    }
  };

  const mouseClicked = () => {
    if (!song) {
      return;
    }

    if (!song.isPlaying()) {
      song.play();
    } else {
      song.pause();
    }
  };

  class Particle {
    constructor(p) {
      this.pos = p.constructor.Vector.random2D().mult(250);
      this.vel = p.createVector();
      this.acc = this.pos.copy().mult(p.random(0.0001, 0.00001));

      this.w = p.random(3, 5);
      this.color = [p.random(200, 255), p.random(200, 255), p.random(200, 255)];
    }
    update(condition) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);

      if (condition) {
        this.pos.add(this.vel);
        this.pos.add(this.vel);
        this.pos.add(this.vel);
      }
    }
    edges() {
      if (
        this.pos.x < -canvasWidth / 2 ||
        this.pos.x > canvasWidth / 2 ||
        this.pos.y < -canvasHeight / 2 ||
        this.pos.y > canvasHeight / 2
      ) {
        return true;
      } else {
        return false;
      }
    }
    show(p) {
      p.noStroke();
      p.fill(this.color);
      p.ellipse(this.pos.x, this.pos.y, this.w);
    }
  }

  return (
    <>
      <Sketch
        preload={preload}
        setup={setup}
        draw={draw}
        mouseClicked={mouseClicked}
      />
      {/* <input
        className="upload-file"
        type="file"
        id="upload-file"
        accept="audio/*"
      /> */}
    </>
  );
}

export default P5Sketch;
