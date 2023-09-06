import React, { useEffect } from "react";
import p5 from "p5";

export default function UserSketch(props) {
  const { userSettings } = props;

  useEffect(() => {
    const sketch = (p) => {
      // p5.js setup function
      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        // Load userSettings and set up your sketch based on them
        // For example:
        // - Load audio file
        // - Load image
        // - Set colors
      };

      // p5.js draw function
      p.draw = () => {
        // Your sketch logic here

        p.ellipse(window.innerWidth / 2, window.innerHeight / 2, 100, 100);
        p.fill(255);
      };
    };

    new p5(sketch); // Create a new p5.js sketch
  }, [userSettings]);

  return <div className="user-sketch-container"></div>;
}
