import "./SignUpPage.scss";
import visualizerGif from "../../assets/images/ncs.gif";

function SignUpPage() {
  function handleSubmit(e) {
    e.preventDefault();
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
