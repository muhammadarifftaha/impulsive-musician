import { faCaretDown, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Button, ButtonGroup, Card, Dropdown } from "react-bootstrap";

function DashboardCards({ progressionData, setReload }) {
  const [progression, setProgression] = useState(progressionData);

  const chordShow = () => {
    const { chords } = progression;
    const findNull = (chord) => chord.note === null || !chord.note;
    if (chords.findIndex(findNull) === -1) {
      return chords.map((chord, idx) => {
        return (
          <span key={chord.note + chord.chord + idx}>
            {chord.note + chord.chord}
          </span>
        );
      });
    } else {
      return <p>Chord data incomplete</p>;
    }
  };

  function deleteProgression() {
    axios({
      url: `/api/app/progression/${progression.uuid}`,
      method: "delete",
    }).then((res) => {
      if (res.status === 200) {
        setReload(true);
      }
    });
  }

  return (
    <>
      <Card className="w-30 align-self-stretch">
        <Card.Header>
          <Card.Title>{progression.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text className="fw-bold">Chords</Card.Text>
          <Card.Text className="d-flex flex-row justify-content-evenly w-100">
            {chordShow()}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Dropdown as={ButtonGroup}>
            <Link
              href={`/app/progressions/view/${progression.uuid}`}
              passHref
              legacyBehavior
            >
              <Button>
                <FontAwesomeIcon icon={faEye} />
              </Button>
            </Link>
            <Dropdown.Toggle></Dropdown.Toggle>
            <Dropdown.Menu>
              <Link
                href={`/app/progression/edit/${progression.uuid}`}
                passHref
                legacyBehavior
              >
                <Dropdown.Item>Edit</Dropdown.Item>
              </Link>

              <Dropdown.Item onClick={deleteProgression}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Footer>
      </Card>
    </>
  );
}

export default DashboardCards;
