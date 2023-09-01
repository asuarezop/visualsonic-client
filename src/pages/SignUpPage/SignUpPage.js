import "./SignUpPage.scss";
import visualizerGif from "../../assets/images/ncs.gif";
import uploadIcon from "../../assets/icons/upload-solid.svg";
import { useState } from "react";

function SignUpPage() {
  const [audioFile, setAudioFile] = useState("");
  const [imageFile, setImageFile] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  //Handling uploaded files
  function handleAudioFile(e) {
    const uploadedAudioFile = e.target.files[0].name;
    setAudioFile(uploadedAudioFile);
  }

  function handleImageFile(e) {
    const uploadedImageFile = e.target.files[0].name;
    setImageFile(uploadedImageFile);
  }

  return (
    <>
      <section className="sign-up">
        <div className="sign-up-card">
          <h1 className="sign-up-card__title">Create Your Account</h1>
          <p className="sign-up-card__sub-title">
            Welcome, register your details below to save your own visualizer
            profile!
          </p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-input">
              <label className="form-input__title">
                First Name:
                <input
                  className="form-input__firstname"
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="First name"
                ></input>
              </label>
            </div>
            <div className="form-input">
              <label className="form-input__title">
                Last Name:
                <input
                  className="form-input__lastname"
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                ></input>
              </label>
            </div>
            <div className="form-input">
              <label className="form-input__title">
                Email:
                <input
                  className="form-input__email"
                  id="email"
                  type="text"
                  name="email"
                  placeholder="joe@gmail.com"
                ></input>
              </label>
            </div>
            <div className="form-input">
              <label className="form-input__title">
                Password:
                <input
                  className="form-input__password"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password must have at least 8 characters"
                ></input>
              </label>
            </div>
            <div className="form-input">
              <label className="form-input__title">
                Confirm Password:
                <input
                  className="form-input__confirm-password"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Retype password"
                ></input>
              </label>
            </div>
            <div className="form-input">
              <label className="form-input__title">
                Visualizer Color:
                <input
                  className="form-input__color"
                  id="visualizerColor"
                  type="color"
                  name="visualizerColor"
                  placeholder="Choose your visualizer color"
                ></input>
              </label>
            </div>
            <div className="upload-files">
              <span className="upload-files__title">
                Select a song and image to generate your visualizer
              </span>
              <input
                onChange={handleAudioFile}
                className="upload-files__input"
                id="soundFile"
                type="file"
                name="soundFile"
                accept="audio/*"
              ></input>
              <label htmlFor="soundFile" className="upload-files__audio">
                <img
                  className="upload-files__icon"
                  src={uploadIcon}
                  alt="upload icon"
                />
                &nbsp;Select audio file
              </label>
              <span>
                <strong>Chosen file: </strong>
                <span onChange={handleAudioFile} id="file-name">
                  {audioFile}
                </span>
              </span>
              <input
                onChange={handleImageFile}
                className="upload-files__input"
                id="imageFile"
                type="file"
                name="imageFile"
                accept="image/*"
              ></input>
              <label htmlFor="imageFile" className="upload-files__image">
                <img
                  className="upload-files__icon"
                  src={uploadIcon}
                  alt="upload icon"
                />
                &nbsp;Select image file
              </label>
              <span>
                <strong>Chosen file: </strong>
                <span onChange={handleImageFile} id="file-name">
                  {imageFile}
                </span>
              </span>
            </div>
            <div className="form-button">
              <button
                className="form-button__submit form-button__submit--cta"
                type="submit"
              >
                Submit Form
              </button>
            </div>
          </form>
        </div>
        <div className="sign-up-preview">
          <h2 className="sign-up-preview__title">Welcome to VisualSonic</h2>
          <p className="sign-up-preview__sub-heading">
            Elevate your music experience through our pre-built audio visualizer
          </p>
          <img
            className="sign-up-preview__gif"
            src={visualizerGif}
            alt="audio visualizer gif"
          />
        </div>
      </section>
    </>
  );
}

export default SignUpPage;
