import React, { useState } from "react";

import { signup } from "../../actions/auth";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "ryan",
    email: "ryan@gmail.com",
    password: "password",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.table({
    //   name,
    //   email,
    //   password,
    //   error,
    //   loading,
    //   message,
    //   showForm,
    // });
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };
    signup(user)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            loading: false,
            message: data.message,
            showForm: false,
          });
        }
      })
      .catch((error) => {
        //error: {string of error}
        setValues({ ...values, error: error });
      });
  };
  const handleChange = (name) => (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : null;
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : null;
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : null;

  const signupForm = () => {
    return (
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={name}
            type="text"
            className="form-control"
            placeholder="Type your name"
            onChange={handleChange("name")}
          ></input>
        </div>
        <div className="form-group">
          <input
            value={email}
            type="email"
            className="form-control"
            placeholder="Type your email"
            onChange={handleChange("email")}
          ></input>
        </div>
        <div className="form-group">
          <input
            value={password}
            type="password"
            className="form-control"
            placeholder="Type your password"
            onChange={handleChange("password")}
          ></input>
        </div>
        <div>
          <button className="btn btn-primary">Signup</button>
        </div>
      </form>
    );
  };
  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
    </>
  );
};
export default SignupComponent;
