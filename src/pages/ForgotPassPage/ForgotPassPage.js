import './ForgotPassPage.scss';
import { useState } from 'react';
import { auth } from '../../firebase/firebase.js';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../features/auth/passAuth.js';

export default function ForgotPassPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      forgotPassword(auth, email);
      navigate('/email-notify');
    } catch (err) {
      console.error('Failed to reset password:', err.message);
    }
  };

  return (
    <>
      <section className="forgot-pass">
        <div className="forgot-pass-card">
          <h1 className="forgot-pass-card__title">Forgot Password?</h1>
          <p className="forgot-pass-card__text">
            Enter the email associated with your account and we'll send you an
            email with instructions to reset your password.
          </p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-input">
              <label className="form-input__title">
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
            <div className="form-button">
              <button
                className="form-button__reset form-button__reset--cta"
                type="submit"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
