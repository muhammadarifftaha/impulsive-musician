import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import landingLogo from "../public/assets/images/impulsive-logo.png";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session || session !== null) {
      router.push("/app");
    }
  }, [router, session]);
  return (
    <>
      <Head>
        <title>Impulsive Musician</title>
      </Head>

      <main>
        <Container fluid className="p-0 m-0">
          <Container
            fluid
            className="hero bg-overlay d-flex justify-content-center align-items-center text-center p-0 m-0 h-100"
          >
            <Container className="d-flex flex-column justify-content-center align-items-center my-5">
              <Image
                src={landingLogo}
                alt="Impulsive Musician Logo"
                className="w-auto h-auto"
              />
              <h1>Impulsive Musician</h1>
              <h3>Create. Save. Inspire.</h3>
              <Container className="w-70 mb-4">
                <p className=" mb-2">
                  The perfect app for the impulsive musician. Create and save
                  new chord progressions on the go!
                </p>
                <h6>What are you waiting for? Sign up now!</h6>

                <Container className="d-flex gap-2 flex-column flex-lg-row justify-content-center mt-4">
                  <Link href="/users" passHref legacyBehavior>
                    <Button variant="primary" size="lg" className="flex-fill">
                      Sign Up!
                    </Button>
                  </Link>
                  <Link href="/users" passHref legacyBehavior>
                    <Button
                      variant="outline-light"
                      size="lg"
                      className="flex-fill"
                    >
                      Sign In
                    </Button>
                  </Link>
                </Container>
              </Container>
            </Container>
          </Container>

          <Container
            fluid
            className="d-flex flex-column justify-content-center align-items-center my-5"
          >
            <h3>Features</h3>
            <Container className="w-80 g-2 text-start">
              <Row>
                <Col className="my-3">
                  <Card>
                    <Card.Header>
                      <Card.Title>Create</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Aliquam a pariatur, ea, modi, dolorem molestias
                        nam quas dolore laboriosam voluptatum deserunt? Fugiat,
                        architecto ea? Optio, amet? Tempora soluta debitis
                        harum.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="my-3">
                  <Card>
                    <Card.Header>
                      <Card.Title>Save</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Aliquam a pariatur, ea, modi, dolorem molestias
                        nam quas dolore laboriosam voluptatum deserunt? Fugiat,
                        architecto ea? Optio, amet? Tempora soluta debitis
                        harum.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="my-3">
                <Col className="my-3">
                  <Card>
                    <Card.Header>
                      <Card.Title>Edit</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Aliquam a pariatur, ea, modi, dolorem molestias
                        nam quas dolore laboriosam voluptatum deserunt? Fugiat,
                        architecto ea? Optio, amet? Tempora soluta debitis
                        harum.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="my-3">
                  <Card>
                    <Card.Header>
                      <Card.Title>Inspire</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Aliquam a pariatur, ea, modi, dolorem molestias
                        nam quas dolore laboriosam voluptatum deserunt? Fugiat,
                        architecto ea? Optio, amet? Tempora soluta debitis
                        harum.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Container>
          <Container
            fluid
            className="d-flex flex-column justify-content-center align-items-center py-5 bg-blue text-light"
            id="cta-section"
          >
            <h5>Call To Action</h5>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <Container className="d-flex flex-row justify-content-center align-items-center gap-3 pb-5">
              <Button variant="dark">Register</Button>
              <Button variant="outline-dark">Sign In</Button>
            </Container>
          </Container>
        </Container>{" "}
      </main>
    </>
  );
}
