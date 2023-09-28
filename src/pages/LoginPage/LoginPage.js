import './LoginPage.scss';

function LoginPage() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label className="form-input__title">
            Email
            <input
              className="form-input__email-title"
              id="title"
              type="text"
              name="email"
              placeholder="Email"
            ></input>
          </label>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
