import React, { useEffect } from "react";
import Head from "next/head";
import { useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Dropdown,
  Form,
  InputGroup,
  OverlayTrigger,
  Stack,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";
import musicData from "../../../data/data.json";
import ChordCards from "../../../components/chordCards";
import ChordButtons from "../../../components/chordButtons";
import ProgressionToast from "../../../components/progressionToast";
import Router, { useRouter } from "next/router";
import axios from "axios";
import Player from "../../../components/player";
import { useSession } from "next-auth/react";
const Soundfont = require("soundfont-player");

export default function Create() {
  const router = useRouter();
  const {
    status,
    data: { session },
  } = useSession({
    required: true,
  });

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
  const [progressionData, setProgressionData] = useState({
    uuid: "",
    name: "Untitled Progression",
    tempo: 120,
    instrument: "acoustic_grand_piano",
  });
  const [octave, setOctave] = useState(4);
  const [editName, setEditName] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(0);
  const [notSaved, setNotSaved] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const titleName = useRef(null);

  function displayToasts(message) {
    setShowToast(true);
    setToastMessage(message);
  }

  function handleChanges(e) {
    setNotSaved(true);
    setProgressionData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  }

  const handleEditName = async () => {
    await setEditName(true);
    titleName.current.focus();
  };

  const progression = {
    add: function (chordData) {
      setNotSaved(true);
      const isEmpty = (element) => element.note === null;
      const emptyIndex = selectedChords.findIndex(isEmpty);
      if (emptyIndex === -1) {
        displayToasts("noEmptyPosition");
      } else {
        setSelectedChords((prevState) => {
          let newArr = [...prevState];
          newArr[emptyIndex] = chordData;
          return newArr;
        });
      }
    },

    remove: function (index) {
      setNotSaved(true);
      setSelectedChords((prevState) => {
        let newArr = [...prevState];
        newArr[index] = {
          note: null,
          chord: null,
          octave: null,
        };
        return newArr;
      });
    },
  };

  const move = {
    up: function (index) {
      let targetIndex = index - 1;
      if (targetIndex < 0) {
        targetIndex = 4;
      }
      setSelectedChords((prevState) => {
        let newArr = [...prevState];
        let temp = newArr[index];
        newArr[index] = newArr[targetIndex];
        newArr[targetIndex] = temp;
        return newArr;
      });
    },
    down: function (index) {
      let targetIndex = index + 1;
      if (targetIndex > 4) {
        targetIndex = 0;
      }
      setSelectedChords((prevState) => {
        let newArr = [...prevState];
        let temp = newArr[index];
        newArr[index] = newArr[targetIndex];
        newArr[targetIndex] = temp;
        return newArr;
      });
    },
  };

  async function saveProgression() {
    setNotSaved(false);
    const user = session.user;
    const saveData = {
      ...progressionData,
      userID: user.uuid,
      chords: selectedChords,
    };
    const axiosConfig = {
      url: "/api/app/progression",
      method: "put",
      data: saveData,
    };

    if (!progressionData.uuid || progressionData.uuid === "") {
      axiosConfig.method = "post";
    } else {
      axiosConfig.method = "put";
    }

    axios(axiosConfig)
      .then((res) => {
        const data = res.data;
        if (res.status === 201) {
          setProgressionData(data);
          displayToasts("saveSuccess");
        } else if (res.status === 200) {
          console.log(response);
          displayToasts("saveSuccess");
        } else {
          console.log(response);
          displayToasts("unknown");
        }
      })
      .catch((err) => {
        console.log(err);
        displayToasts("ServerError");
      });
  }

  function saveAndExit() {
    saveProgression().then(() => {
      setTimeout(() => router.push("/app"), 3000);
    });
  }

  useEffect(() => {
    const confirmationMessage = "Changes you made may not be saved.";
    const beforeUnloadHandler = (e) => {
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
    };
    const beforeRouteHandler = (url) => {
      if (Router.pathname !== url && !confirm(confirmationMessage)) {
        Router.events.emit("routeChangeError");
        // tslint:disable-next-line: no-string-throw
        throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
      }
    };
    if (notSaved) {
      window.addEventListener("beforeunload", beforeUnloadHandler);
      Router.events.on("routeChangeStart", beforeRouteHandler);
    } else {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      Router.events.off("routeChangeStart", beforeRouteHandler);
    }
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      Router.events.off("routeChangeStart", beforeRouteHandler);
    };
  }, [notSaved]);

  useEffect(() => {
    Soundfont.instrument(new AudioContext(), progressionData.instrument, {
      gain: 10,
    }).then((player) => {
      setAudioPlayer(player);
    });
  }, [progressionData.instrument, octave]);

  return (
    <>
      <Head>
        <title>New Progression - Impulsive Musician</title>
      </Head>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center flex-fill py-5 position-relative"
        id="progression-page"
      >
        <Card className="d-flex flex-column justify-content-center align-items-start gap-4">
          <Container className="d-flex flex-column justify-content-center align-items-start">
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip>Click to edit</Tooltip>}
            >
              <InputGroup onClick={handleEditName} id="progression-title">
                <Form.Control
                  type="text"
                  className="display-4"
                  id="name"
                  value={progressionData.name}
                  onChange={handleChanges}
                  onBlur={() => setEditName(false)}
                  disabled={!editName}
                  ref={titleName}
                />
              </InputGroup>
            </OverlayTrigger>
            <Container className="d-flex flex-column flex-md-row flex-md-wrap flex-lg-nowrap gap-3">
              <InputGroup className="w-auto">
                <InputGroup.Text>Tempo</InputGroup.Text>
                <Form.Control
                  type="number"
                  min={40}
                  max={200}
                  value={progressionData.tempo}
                  onChange={handleChanges}
                />
              </InputGroup>
              <InputGroup className="w-auto">
                <InputGroup.Text id="instrument-label">
                  Instrument
                </InputGroup.Text>
                <Form.Select
                  defaultValue={progressionData.instrument}
                  onChange={handleChanges}
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
              <InputGroup className="w-auto">
                <InputGroup.Text>Octave</InputGroup.Text>
                <Form.Control
                  type="number"
                  min={1}
                  max={7}
                  value={octave}
                  onChange={(e) => setOctave(e.target.value)}
                />
              </InputGroup>
            </Container>
          </Container>
          <Container
            fluid
            className="d-flex flex-column flex-lg-row  justify-content-center align-items-center gap-4"
          >
            <Card
              fluid
              className="d-flex flex-column flex-md-row flex-md-wrap flex-lg-nowrap flex-fill justify-content-evenly align-items-center align-self-stretch py-5 px-3 gap-3"
              id="selected-chords"
            >
              {selectedChords.map((chord, idx) => {
                return (
                  <ChordCards
                    key={"selected" + idx}
                    index={idx}
                    chordData={chord}
                    audioPlayer={audioPlayer}
                    remove={progression.remove}
                    move={move}
                  />
                );
              })}
            </Card>
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
                    displayToasts={displayToasts}
                  />
                  <hr className="m-0" />
                  <ButtonGroup>
                    <Button variant="outline-dark" onClick={saveProgression}>
                      Save
                    </Button>
                    <Dropdown as={ButtonGroup} align="end">
                      <Dropdown.Toggle
                        variant="outline-dark"
                        id="dropdown-save-context"
                      ></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={saveAndExit}>
                          Save and Exit
                        </Dropdown.Item>
                        <Dropdown.Item>Reset</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </ButtonGroup>
                </Stack>
              </Card.Body>
            </Card>
          </Container>
          <Tabs
            id="chord-tabs"
            className="mb-3 d-flex flex-row mx-auto"
            defaultActiveKey={musicData.notes[0]}
          >
            {musicData.notes.map((note) => {
              return (
                <Tab key={note + "-chordlist"} eventKey={note} title={note}>
                  <Container
                    fluid
                    key={note}
                    className="d-flex flex-column flex-md-row flex-wrap justify-content-evenly gap-3 m-0 px-0"
                    id="chord-list"
                  >
                    {musicData.chords.map((chord) => {
                      const chordData = {
                        note: note,
                        chord: chord,
                        octave: octave,
                      };

                      return (
                        <ChordButtons
                          key={note + "-note-" + chord + "-chord"}
                          chordData={chordData}
                          addToProgression={progression.add}
                          audioPlayer={audioPlayer}
                        />
                      );
                    })}
                  </Container>
                </Tab>
              );
            })}
          </Tabs>
        </Card>
        <ProgressionToast
          showToast={showToast}
          setShowToast={setShowToast}
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
        />
      </Container>
    </>
  );
}
