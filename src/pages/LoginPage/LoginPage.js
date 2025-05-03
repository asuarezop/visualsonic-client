import './LoginPage.scss';
import { useState } from 'react';
import {
  auth,
  googleProvider,
  microsoftProvider,
} from '../../config/firebase.js';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import visualizerGif from '../../assets/images/ncs.gif';
import googleIcon from '../../assets/icons/logo-google.svg';
import microsoftIcon from '../../assets/icons/microsoft.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const signInMicrosoft = async () => {
    try {
      const result = await signInWithPopup(auth, microsoftProvider);
      console.log(result.user);
    } catch (err) {
      console.log('Error during Microsoft sign-in:', err);
      throw err;
    }
  };

  return (
    <>
      <section className="login">
        <div className="login-card">
          <h1 className="login-card__title">Sign In With Email</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-input">
              <label className="form-input__title">
                Email:
                <input
                  className="form-input__email"
                  id="email"
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </label>
            </div>
            <div className="form-button">
              <button
                className="form-button__submit form-button__submit--cta"
                type="submit"
                onClick={signIn}
              >
                Sign In
              </button>
            </div>
            <hr className="form__divider"></hr>
          </form>
          <div className="login-option">
            <h2 className="login-option__title">Sign In With...</h2>
            <button
              className="login-provider login-provider--cta"
              onClick={signInGoogle}
            >
              <img
                className="login-provider__logo"
                src={googleIcon}
                alt="Google Logo"
              />
              <p className="login-provider__text">GOOGLE</p>
            </button>
            <button
              className="login-provider login-provider--cta"
              onClick={signInMicrosoft}
            >
              <img
                className="login-provider__logo"
                src={microsoftIcon}
                alt="Microsoft Logo"
              />
              <p className="login-provider__text">MICROSOFT</p>
            </button>
          </div>
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

export default LoginPage;
