import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

export default function Register() {
  const [newUser, setNewUser] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [validated, setValidated] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [repassword, setRepassword] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { data: session } = useSession();
  const router = useRouter();

  const handleUserEmail = (e) => {
    setShowForm(false);
    setUserData((prevState) => {
      return { ...prevState, email: e.target.value };
    });
    setEmailInvalid(false);
  };

  function checkEmail(e) {
    const emailInput = e.target;

    const valid = emailInput.checkValidity();

    if (valid && (userData.email !== "" || userData.email.length > 0)) {
      axios({
        url: "/api/findUser",
        method: "POST",
        data: { email: userData.email },
      })
        .then((res) => {
          const foundUser = res.data;
          if (foundUser.email === userData.email) {
            setNewUser(false);
            setShowForm(true);
            setUserData((prevState) => ({
              ...prevState,
              name: foundUser.name,
            }));
          } else {
            setNewUser(true);
            setShowForm(true);
          }
        })
        .catch((error) => console.log(error));
    } else {
      if (userData.email === "" || userData.email.length < 1) {
        setEmailInvalid(false);
      } else {
        setEmailInvalid(true);
      }
    }
  }

  const handleUserData = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
    setPasswordMismatch(false);
  };

  const handleRepassword = (e) => {
    setSubmitDisabled(true);
    setPasswordMismatch(false);
    setRepassword(e.target.value);
  };

  const validatePassword = () => {
    if (repassword !== "" && userData.password !== "") {
      if (repassword !== userData.password) {
        setPasswordMismatch(true);
        setSubmitDisabled(true);
        setPasswordMatch(false);
      } else if (repassword === userData.password) {
        setPasswordMismatch(false);
        setSubmitDisabled(false);
        setPasswordMatch(true);
      }
    } else {
      setPasswordMismatch(false);
      setSubmitDisabled(true);
      setPasswordMatch(false);
    }
  };

  function createUser(e) {
    e.preventDefault();
    if (!passwordMismatch) {
      setValidated(true);
    } else {
      setValidated(false);
    }

    if (validated) {
      axios({
        url: "/api/register",
        method: "POST",
        data: userData,
      })
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            loginUser();
            setLoggingIn(true);
            console.log("created");
          } else if (res.data.code === 11000) {
            setDuplicate(true);
            setNewUser(false);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  async function loginUser() {
    const res = await signIn("email", {
      redirect: false,
      email: userData.email,
      password: userData.password,
    });

    if (res.ok && (res.error === null || !res.error)) {
      router.push("/app");
      // console.log(session);
    }
  }

  useEffect(() => {
    if (session) {
      router.push("/app");
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Register/Login - Impulsive Musician</title>
      </Head>
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-start flex-fill"
        id="users-container"
      >
        <Container
          className="d-flex flex-column justify-content-center  text-start flex-lg-fill"
          id="form-container"
        >
          <h3 className="ms-3">Register/Sign In</h3>
          <Container className="d-flex flex-row gap-2 w-80">
            {loggingIn ? (
              <>{/* CODE STUFF FOR LOGGINg IN ANIMATION HERE */}</>
            ) : showForm ? (
              newUser ? (
                <Form className="my-3" onSubmit={createUser} id="register-form">
                  <p>
                    Welcome! Fill in the form below to create an account with
                    Impulsive Musician.
                  </p>
                  <FloatingLabel
                    label="Email Address"
                    controlId="email"
                    className="mb-3"
                  >
                    <Form.Control
                      autoComplete="email"
                      type="email"
                      placeholder="Email Address"
                      onChange={handleUserEmail}
                      value={userData.email}
                      disabled
                    />
                  </FloatingLabel>
                  <FloatingLabel controlId="name" label="Name" className="mb-3">
                    <Form.Control
                      autoComplete="name"
                      type="text"
                      placeholder="Name"
                      onChange={handleUserData}
                      value={userData.name}
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="password"
                    label="Create new password"
                    className="mb-3"
                  >
                    <Form.Control
                      autoComplete="new-password"
                      type="password"
                      placeholder="Create new password"
                      minLength="8"
                      onChange={handleUserData}
                      onBlur={validatePassword}
                      value={userData.password}
                      isInvalid={passwordMismatch}
                      isValid={passwordMatch}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Password doesn&apos;t match
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="repassword"
                    label="Confirm password"
                    className="mb-3"
                  >
                    <Form.Control
                      autoComplete="new-password"
                      type="password"
                      placeholder="Confirm Password"
                      minLength="8"
                      onChange={handleRepassword}
                      onBlur={validatePassword}
                      value={repassword}
                      isInvalid={passwordMismatch}
                      isValid={passwordMatch}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Password doesn&apos;t match
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Container className="d-flex justify-content-center gap-2">
                    <Button
                      className="flex-fill"
                      type="submit"
                      disabled={submitDisabled}
                    >
                      Register
                    </Button>
                    <Button
                      className="flex-fill"
                      variant="outline-danger"
                      onClick={() => setShowForm(false)}
                    >
                      Back
                    </Button>
                  </Container>
                </Form>
              ) : (
                <Form
                  noValidate
                  validated={validated}
                  className="my-3"
                  id="login-form"
                >
                  {duplicate ? (
                    <p>
                      Sorry, {userData.name}. You already have an account with
                      us. Let&apos;s get you signed in instead.
                    </p>
                  ) : (
                    <p>
                      Welcome back, {userData.name}! Let&apos;s get you signed
                      in.
                    </p>
                  )}
                  <FloatingLabel
                    label="Email Address"
                    controlId="email"
                    className="mb-3"
                  >
                    <Form.Control
                      autoComplete="email"
                      type="email"
                      placeholder="Email Address"
                      onChange={handleUserData}
                      value={userData.email}
                      disabled
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="password"
                    label="Password"
                    className="mb-3"
                  >
                    <Form.Control
                      autoComplete="current-password"
                      type="password"
                      placeholder="Password"
                      minLength="8"
                      onChange={handleUserData}
                      isInvalid={wrongPassword}
                      value={userData.password}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Wrong Password. Please retype your password.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Container className="d-flex justify-content-center gap-2">
                    <Button
                      className="flex-fill"
                      type="button"
                      onClick={loginUser}
                    >
                      Login
                    </Button>
                    <Button
                      className="flex-fill"
                      variant="outline-danger"
                      onClick={() => setShowForm(false)}
                    >
                      Back
                    </Button>
                  </Container>
                </Form>
              )
            ) : (
              <Form
                className="align-self-center mt-3 mb-5 d-flex flex-column gap-3
                "
              >
                <p className="m-0">
                  Hi, there. Let&apos;s get you started with Impulsive Musician.
                  Please enter your email address and we&apos;ll check if you
                  have an account with us.
                </p>

                <Form.FloatingLabel controlId="email" label="Email Address">
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    onChange={handleUserEmail}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    value={userData.email}
                    isInvalid={emailInvalid}
                    onBlur={checkEmail}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please retype a valid email.
                  </Form.Control.Feedback>
                </Form.FloatingLabel>
              </Form>
            )}
          </Container>
        </Container>
      </Container>
    </>
  );
}
