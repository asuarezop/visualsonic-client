import './ForgotPassPage.scss';

export default function ForgotPassPage() {
  return (
    <>
      <section className="forgot-pass">
        <div className="forgot-pass-card">
          <h1 className="forgot-pass-card__title">Forgot Password?</h1>
          <p className="forgot-pass-card__text">
            Enter the email associated with your account and we'll send you an
            email with instructions to reset your password.
          </p>
          <form className="form">
            <div className="form-input">
              <label className="form-input__title">
                <input
                  className="form-input__email"
                  id="email"
                  type="text"
                  name="email"
                  placeholder="Email"
                ></input>
              </label>
            </div>
            <div className="form-button">
              <button
                className="form-button__reset form-button__reset--cta"
                type="reset"
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
