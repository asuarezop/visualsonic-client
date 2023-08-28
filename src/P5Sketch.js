import React, { Component } from "react";
import p5 from "p5"; // get p5 object to use sound library

//To import new p5 sketch component in INSTANCE mode
class P5Sketch extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  Sketch = (p) => {
    let windowWidth = window.screen.width;
    let windowHeight = window.screen.height;
    let x = 100;
    let y = 100;

    p.preload = () => {
      let song = p.loadSound();
      let img = p.loadImage();
    };

    p.setup = () => {
      p.createCanvas(windowWidth, windowHeight);
      p.oscillator = new p5.Oscillator();
      p.oscillator.start();
    };

    p.draw = () => {
      p.background(220);
      // Your p5.js drawing code here
      p.background(0);
      p.fill(255);
      p.rect(x, y, 50, 50);
    };
  };

  //To mount new p5 objects onto screen
  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  //To cleanup any p5 objects to not be rendered on screen
  componentWillUnmount() {
    this.myP5.remove();
    this.myP5.remove();
    this.myP5.oscillator.stop();
    this.myP5.oscillator.dispose();
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

export default P5Sketch;
