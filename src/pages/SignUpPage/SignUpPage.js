import "./SignUpPage.scss";

function SignUpPage() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <section className="sign-up">
        <h1 className="sign-up__title">
          Register to save your own visualizer profile
        </h1>

        <div className="sign-up-card">
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
                  type="text"
                  name="password"
                  placeholder="Password must have at least 8 characters"
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
                  value="#007ea7"
                  placeholder="Choose your visualizer color"
                ></input>
              </label>
            </div>
            <div className="form-button">
              <button className="form-button__submit" type="submit">
                Submit Form
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignUpPage;
