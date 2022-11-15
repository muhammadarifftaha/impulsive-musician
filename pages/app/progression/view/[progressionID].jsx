import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Card,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Spinner,
  Stack,
} from "react-bootstrap";
import musicData from "../../../../data/data.json";
import ViewChordCards from "../../../../components/viewChordCards";
import { useRouter } from "next/router";
import axios from "axios";
import Player from "../../../../components/player";

function Edit() {
  const Soundfont = require("soundfont-player");
  const router = useRouter();
  const { progressionID } = router.query;
  const [selectedChords, setSelectedChords] = useState([
    {
      note: null,
      chord: null,
      octave: null,
    },
    {
      note: null,
      chord: null,
      octave: null,
    },
    {
      note: null,
      chord: null,
      octave: null,
    },
    {
      note: null,
      chord: null,
      octave: null,
    },
  ]);
  const [progressionData, setProgressionData] = useState({});
  const [username, setUsername] = useState("initialState");
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [loaded, setLoaded] = useState(false);

  async function fetchData() {
    const data = await axios({
      url: `http://localhost:3000/api/app/progression/${progressionID}`,
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
      .then(async (data) => {
        const userData = await axios({
          url: `http://localhost:3000/api/findUser/${data.userID}`,
          method: "GET",
        })
          .then((res) => {
            if (res.status === 200) {
              return res.data;
            }
          })
          .catch((err) => {
            console.log(err);
          });

        return { savedProgression: data, userData: userData };
      })
      .catch((err) => {
        console.log(err);
      });

    return {
      savedProgression: data.savedProgression,
      userData: data.userData,
    };
  }

  useEffect(() => {
    Soundfont.instrument(new AudioContext(), progressionData.instrument, {
      gain: 10,
    }).then((player) => {
      setAudioPlayer(player);
    });
  }, [progressionData.instrument]);

  useEffect(() => {
    if (!loaded) {
      console.log("fetching");
      fetchData()
        .then((data) => {
          const { savedProgression, userData } = data;
          if (savedProgression !== "") {
            const { instrument, name, tempo, uuid, chords } = savedProgression;
            setProgressionData({
              instrument: instrument,
              name: name,
              tempo: tempo,
              uuid: uuid,
              chords: chords,
            });
            setSelectedChords([...chords]);
          } else {
            return false;
          }
          if (userData || userData !== undefined) {
            setUsername(userData.name);
          } else {
            return false;
          }
          return true;
        })
        .then((dataDone) => {
          if (dataDone) {
            setLoaded(true);
          } else {
            setLoaded(false);
          }
        });
    }
  });

  return (
    <>
      <Head>
        <title>New Progression - Impulsive Musician</title>
      </Head>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center flex-fill py-5 position-relative"
        id="view-progression-page"
      >
        {loaded ? (
          <>
            <Card className="d-flex flex-column justify-content-center align-items-start gap-4">
              <Container className="d-flex flex-column justify-content-center align-items-start">
                <h3>{progressionData.name}</h3>
                <h6>by {username}</h6>
                <Container className="d-flex flex-column gap-3 my-3">
                  <h6>Tempo : {progressionData.tempo}bpm</h6>
                  <InputGroup className="w-auto">
                    <InputGroup.Text id="instrument-label">
                      Instrument
                    </InputGroup.Text>
                    <Form.Select
                      value={progressionData.instrument}
                      onChange={(e) =>
                        setProgressionData((prevState) => {
                          return { ...prevState, instrument: e.target.value };
                        })
                      }
                    >
                      {musicData.instruments.map((instrument) => {
                        let instrumentName = instrument
                          .split("_")
                          .map((word) => {
                            return word.charAt(0).toUpperCase() + word.slice(1);
                          })
                          .join(" ");
                        return (
                          <option key={instrument} value={instrument}>
                            {instrumentName}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </InputGroup>
                </Container>
              </Container>
              <Container
                fluid
                className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-4"
              >
                <ListGroup className="" id="view-chord-list">
                  {selectedChords.map((chord, idx) => {
                    return (
                      <ViewChordCards
                        key={"selected" + idx}
                        index={idx}
                        chordData={chord}
                        audioPlayer={audioPlayer}
                      />
                    );
                  })}
                </ListGroup>
                <Card
                  className="d-flex flex-fill flex-column justify-content-start gap-3"
                  id="player-card"
                >
                  <Card.Body>
                    <Stack gap={3} className="h-100 flex-row flex-lg-column">
                      <Player
                        chords={selectedChords}
                        tempo={progressionData.tempo}
                        audioPlayer={audioPlayer}
                      />
                    </Stack>
                  </Card.Body>
                </Card>
              </Container>
            </Card>
          </>
        ) : (
          <Container className="d-flex flex-column gap-3 justify-content-center align-items-center">
            <Spinner animation="border">
              <span className="visually-hidden">Loading</span>
            </Spinner>
            <p>Loading</p>
          </Container>
        )}
      </Container>
    </>
  );
}

export default Edit;
