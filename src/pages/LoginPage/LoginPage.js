import "./LoginPage.scss";


function LoginPage() {
  function handleSubmit(e) {
    e.preventDefault();

   
  }
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label className="form-input__title">
            First Name
            <input
              className="form-input__firstname-title"
              id="title"
              type="text"
              name="firstName"
              placeholder="Enter your first name"
            ></input>
          </label>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
