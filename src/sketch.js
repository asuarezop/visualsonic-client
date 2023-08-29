import React, { Component } from "react";
import p5 from "p5"; // Importing actual p5 library
// import "p5/lib/addons/p5.sound"; // Importing p5 sound library addon, not included by default when installing p5

//To import new p5 sketch component in INSTANCE mode
class P5Sketch extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  Sketch = (p) => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let x = 100;
    let y = 100;
    let sound;

    // p.preload = function () {
    //   sound = p.loadSound();
    // };

    p.setup = function () {
      p.createCanvas(windowWidth, windowHeight);
    };

    p.draw = function () {
      p.background(0);
      p.fill(255);
      p.rect(x, y, 50, 50);
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  componentWillUnmount() {
    this.myP5.remove();
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

export default P5Sketch;
