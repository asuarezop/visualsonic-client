# VisualSonic

An interactive audio visualization application designed to enhance the music experience for musicians, artists, DJs, live-show events, and entertainment event spaces. 
It offers pre-built audio visualizers and tools to elevate your music and artist brand.

## Getting Started

To setup this project, you can run the following commands:

### `npm i`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Tech Stack
Front-end: HTML, SASS, JavaScript, React, p5.js

Back-end: Node, Express, CORS

## Documentation
https://p5js.org/reference/

## Screenshot
[image](https://github.com/asuarezop/visualsonic-client/assets/43550294/54fd2ddb-c5fe-47a1-988f-525698e146d0)

## Features (Custom Profile Features Coming Soon)

* Select Visualizer Style: Use the arrow keys to choose your preferred visualizer style (in progress).

* Load Music: Upload an MP3 file from your local computer to play with the visualizer (feature coming soon).

* Customize Background: Pick a custom background image to display alongside your track (feature coming soon, must be in JPEG format).

* Apply Settings: Click the "Apply" button on the top-right corner to save your settings and load your custom visualizer.

* Save Profiles: Create and save custom visualizer profiles by clicking the "Sign Up" link on the top-left navigation bar (feature coming soon).

## Lessons / Insights Learned
During the development of VisualSonic, there were many unexpected challenges that occurred. A common theme throughout was learning the limitations of the library you're working with and 
how to work within those restrictions to get the result you want. This came when working with integration of audio playback in the browser, here's what I've learned:

1) Plan for the unexpected
   * In working with the p5.js library and React.js, there were certain restrictions that prevented proper loading of audio files. A thorough examination of the problem was necessary in conjunction with thorough 
     researching and debugging. Learning about other similar technologies and comparing their features to the current technology in use was key in getting past roadblocks during development.

2) Be adaptable
   * There were times when choosing one solution made other problems rise to the surface. Managing the project working state and dealing with version control played a big role in handling edge cases or 
     errors. Being able to pivot from one decision to another and learning to be flexible in the development process led me to understand the code much better, which improved my problem-solving skills overall.
   
3) Experimentation
   * Having an open mind and approaching a problem from different perspectives was critical in implementing the final features of the project. This taught me the importance of testing and iterating on existing 
     ideas to achieve a result that wouldn't have been thought of before. Learning the tools of the p5 library and their functions gave me a holistic view of what features to keep versus which features to 
     eliminate altogether.

## Authors
Anthony Suarez - https://github.com/asuarezop
