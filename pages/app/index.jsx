import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Card, Container, Spinner } from "react-bootstrap";
import { useSession } from "next-auth/react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardCards from "../../components/dashboardCards";

function Dashboard() {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      if (!session) {
        router.push("/users");
      }
    },
  });
  const [userProgressionsLoaded, setUserProgressionsLoaded] = useState(false);
  const [reload, setReload] = useState(true);
  const [userProgression, setUserProgression] = useState("");

  async function fetchUserProgressions() {
    const userID = await session.session.user.uuid;

    return await axios({
      url: `/api/app/${userID}`,
      method: "get",
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (reload && session) {
      setUserProgressionsLoaded(false);
      fetchUserProgressions().then((data) => {
        setUserProgression(data);
        setUserProgressionsLoaded(true);
        setReload(false);
      });
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, session]);

  return (
    <>
      <Head>
        <title>Dashboard - Impulsive Musician</title>
      </Head>
      <Container
        fluid
        className="d-flex flex-column justify-content-start align-items-center flex-fill py-5 w-80 bg-white"
      >
        <h3 className="w-80 my-3">Dashboard</h3>
        <Container className="d-flex w-80 justify-content-between my-4">
          <h5>Your Progressions</h5>
          <Link href="/app/progression/create" passHref legacyBehavior>
            <Button>
              <FontAwesomeIcon icon={faPlusCircle} /> Create New
            </Button>
          </Link>
        </Container>
        <Container className="d-flex justify-content-start align-items-center collection gap-3">
          {userProgressionsLoaded ? (
            <Container
              fluid
              className="d-flex flex-row justify-content-evenly flex-wrap align-items-stretch gap-4"
            >
              {userProgression !== undefined ? (
                <>
                  {userProgression.map((progression, idx) => {
                    return (
                      <DashboardCards
                        key={"progression-index-" + idx}
                        progressionData={progression}
                        setReload={setReload}
                      />
                    );
                  })}
                  <Card className="w-30 align-self-stretch">
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center gap-2">
                      <Card.Title>Create a new progresssion</Card.Title>
                      <Link
                        href="/app/progression/create"
                        passHref
                        legacyBehavior
                      >
                        <Button
                          variant="outline-primary"
                          size="lg"
                          className=""
                        >
                          <FontAwesomeIcon icon={faPlusCircle} />
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </>
              ) : (
                <Container
                  fluid
                  className="d-flex justify-content-center align-items-center"
                >
                  <p>You don&apos;t have any progressions yet</p>
                  <p>Create one now</p>
                  <Link href="/app/progressions/create" passHref legacyBehavior>
                    <Button>
                      <FontAwesomeIcon icon={faPlusCircle} />
                    </Button>
                  </Link>
                </Container>
              )}
            </Container>
          ) : (
            <Container
              fluid
              className="d-flex flex-column justify-content-center align-items-center gap-2"
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading Progressions...</span>
              </Spinner>
              <h5>Loading Progressions</h5>
            </Container>
          )}
        </Container>
      </Container>
    </>
  );
}

export default Dashboard;
