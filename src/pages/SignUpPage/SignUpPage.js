import "./SignUpPage.scss";

function SignUpPage() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1 className="sign-up-form__title">
          Register to save your own visualizer profile
        </h1>
        <div className="sign-up-card">
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
          <section className="profile">
            <h2 className="profile__title">Visualizer Profile</h2>
            <div className="customize-options">
              <h3 className="customize-options__color">
                Choose your own color for visualizer
              </h3>
              <input
                type="color"
                id="userColor"
                name="userColor"
                value="#007ea7"
              />
              <label htmlFor="userColor">Color</label>
            </div>
          </section>
          <div className="form-button">
            <button className="form-button__submit" type="submit">
              Submit Form
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUpPage;
