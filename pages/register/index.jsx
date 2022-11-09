import Head from "next/head";
import React, { useState } from "react";
import { Card, Container, FloatingLabel, Form } from "react-bootstrap";

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  function createUser() {}
  return (
    <>
      <Head>
        <title>Register - Impulsive Musician</title>
      </Head>
      <main>
        <Container
          fluid
          className="d-flex flex-column justify-content-center align-items-center vh-100"
        >
          <Card className="w-90">
            <Card.Body className="d-flex flex-column text-start">
              <h3>REGISTRATION</h3>
              <Form className="my-3" onSubmit={createUser} id="register-form">
                <FloatingLabel controlId="name" label="Name" className="mb-3">
                  <Form.Control
                    autocomplete="name"
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    required
                  />
                  <label for="name">Name</label>
                </FloatingLabel>
                <div className="form-floating mb-3">
                  <input
                    autocomplete="email"
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Email Address"
                    required
                  />
                  <label for="email">Email Address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    autocomplete="new-password"
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    minlength="6"
                    required
                  />
                  <label for="">Password</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    autocomplete="new-password"
                    type="password"
                    name="repassword"
                    id="repassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    minlength="6"
                    required
                  />
                  <label for="repassword">Confirm Password</label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Register
                </button>{" "}
              </Form>
              <h6>
                Already have an account? Click here to{" "}
                <a to="/login">Sign In</a>
              </h6>
            </Card.Body>
          </Card>
        </Container>
      </main>
    </>
  );
}

function Toatser() {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        className="toast toast-danger"
        role="alert"
        id="invalid-pass"
        aria-live="assertive"
        aria-atomic="true"
      >
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
        <div className="toast-header">Password mismatch</div>
        <div className="toast-body">Please re-enter your password.</div>
      </div>
      <div
        className="toast toast-danger"
        role="alert"
        id="user-exist"
        aria-live="assertive"
        aria-atomic="true"
      >
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
        <div className="toast-header">User exists</div>
        <div className="toast-body">
          Email Address entered already has an acocunt
        </div>
      </div>
      <div
        className="toast toast-danger"
        role="alert"
        id="server-err"
        aria-live="assertive"
        aria-atomic="true"
      >
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
        <div className="toast-header">Error</div>
        <div className="toast-body">Internal server error</div>
      </div>
      <div
        className="toast toast-success"
        role="alert"
        id="created-true"
        aria-live="assertive"
        aria-atomic="true"
      >
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
        <div className="toast-header">User Created</div>
        <div className="toast-body">Redirecting...</div>
      </div>
    </div>
  );
}
