import P5Sketch from "../../sketch";
import "./VisualizerPage.scss";

function VisualizerPage() {
  return (
    <>
      <P5Sketch />
      <input
        className="upload-mp3"
        type="file"
        id="fileupload"
        accept="audio/*"
      />
    </>
  );
}

export default VisualizerPage;
