import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <Container
      fluid
      className="text-light text-center text-lg-start m-0 p-0 position-absolute bottom-0"
      id="footer"
    >
      <p className="py-2 my-0 mx-2 ">
        All rights reserved. Muhammad Ariff Taha &copy; 2022
      </p>
    </Container>
  );
}
