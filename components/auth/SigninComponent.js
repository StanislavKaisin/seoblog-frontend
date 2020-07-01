import React, { useState, useEffect } from "react";

import { signin, authentificate, isAuth } from "../../actions/auth";

import Router from "next/router";

const SigninComponent = () => {
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

  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

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
    signin(user)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          //save user token to cookie
          //save user info to localStorage
          //authentificate
          authentificate(data, () => {
            Router.push("/");
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

  const signinForm = () => {
    return (
      <form action="" onSubmit={handleSubmit}>
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
          <button className="btn btn-primary">Signin </button>
        </div>
      </form>
    );
  };
  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </>
  );
};

export default SigninComponent;
