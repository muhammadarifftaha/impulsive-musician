// eslint-disable-no-unused-vars
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faHouse,
  faUserPlus,
  faArrowRightToBracket,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/assets/images/impulsive-logo-nav.png";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  function userLoggedIn() {
    setLoggedIn(true);
  }

  function userLoggedOut() {
    setLoggedIn(false);
  }

  return (
    <Navbar
      expand="lg"
      variant="dark"
      className="bg-darkblue position-absolute top-0 w-100"
      collapseOnSelect
    >
      <Container fluid className="mx-4 d-flex justify-content-between">
        <Link href="/" passHref>
          <Navbar.Brand>
            <Image
              className="h-auto w-auto"
              src={Logo}
              alt="Impulsive Musician Logo"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle
          aria-controls="header-nav-toggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            {loggedIn ? (
              <>
                <Nav.Item className="d-flex align-items-center">
                  <Link href="/app" passHref legacyBehavior>
                    <Nav.Link className="">
                      <FontAwesomeIcon icon={faMusic} /> &nbsp; Dashboard
                    </Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item
                  class="d-flex align-items-center"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  data-bs-title="Currently Unavailable. Work In Progress."
                  id="account"
                >
                  <Link href="/account" passHref legacyBehavior>
                    <Nav.Link className="disabled">
                      <FontAwesomeIcon icon={faUser} /> &nbsp; Account
                    </Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item className="d-flex align-items-center">
                  <Link href="/logout" passHref legacyBehavior>
                    <Nav.Link className="">
                      <FontAwesomeIcon icon={faArrowRightFromBracket} /> &nbsp;
                      Sign Out
                    </Nav.Link>
                  </Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item className="d-flex align-items-center">
                  <Link href="/" passHref legacyBehavior>
                    <Nav.Link className="">
                      <FontAwesomeIcon icon={faHouse} /> &nbsp; Home
                    </Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item className="d-flex align-items-center">
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link className="">
                      <FontAwesomeIcon icon={faUserPlus} /> &nbsp; Register
                    </Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item className="d-flex align-items-center">
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link className="">
                      <FontAwesomeIcon icon={faArrowRightToBracket} />
                      &nbsp; Sign In
                    </Nav.Link>
                  </Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
