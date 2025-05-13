import './EmailNotifyPage.scss';
import emailSentIcon from '../../assets/icons/sent.png';
import { useNavigate } from 'react-router-dom';

export default function EmailNotifyPage() {
  const navigate = useNavigate();

  const handleRedirect = async () => {
    navigate('/login');
  };

  return (
    <>
      <section className="email-notify">
        <div className="email-notify-card">
          <img src={emailSentIcon} alt="Email sent"></img>
          <h1 className="email-notify-card__title">Check Your Email</h1>
          <p className="email-notify-card__text">
            Please check your email. We have sent you an email that contains a
            link to reset your password.
          </p>
          <div className="email-notify-redirect">
            <button
              className="email-notify-redirect__login email-notify-redirect__login--cta"
              onClick={handleRedirect}
            >
              Back to login
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
