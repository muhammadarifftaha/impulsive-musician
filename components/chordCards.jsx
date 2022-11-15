import {
  faCaretLeft,
  faCaretRight,
  faPlay,
  faStop,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Container } from "react-bootstrap";
const Octavian = require("octavian");

export default function ChordCards({
  chordData,
  audioPlayer,
  remove,
  index,
  move,
}) {
  const { note, chord, octave } = chordData;
  const playChord = () => {
    audioPlayer.stop();
    const notes = new Octavian.Chord(`${note}${octave}`, chord).signatures;
    notes.forEach((note) => audioPlayer.play(note));
    audioPlayer.play(note + (octave - 1));
  };

  const content = () => {
    if (note !== null) {
      const chordNotes = new Octavian.Chord(note + octave, chord).signatures;
      return (
        <Card.Body className="p-0 py-3">
          <Container
            fluid
            className="d-flex flex-row justify-content-between align-items-center h-100"
          >
            <Button
              className="m-0 p-0 px-1"
              variant="light"
              onClick={() => move.up(index)}
            >
              <FontAwesomeIcon icon={faCaretLeft} />
            </Button>

            <Container fluid>
              <Card.Title>{note + chord}</Card.Title>
              <Card.Text className="d-flex flex-row justify-content-evenly gap-3">
                {chordNotes.map((note, idx) => {
                  return <span key={idx + "-" + note}>{note}</span>;
                })}
              </Card.Text>
              <Container
                fluid
                className="d-flex flex-row justify-content-end gap-2"
              >
                <Button onClick={playChord}>
                  <FontAwesomeIcon icon={faPlay} />
                </Button>
                <Button variant="outline-danger" onClick={() => remove(index)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Container>
            </Container>
            <Button className="m-0 p-0 px-1" variant="light">
              <FontAwesomeIcon
                icon={faCaretRight}
                onClick={() => move.down(index)}
              />
            </Button>
          </Container>
        </Card.Body>
      );
    } else {
      return (
        <Card.Body>
          <Card.Title>No Chord</Card.Title>
          <Card.Text className="d-flex flex-row justify-content-evenly gap-3">
            <span>Please select a chord</span>
          </Card.Text>
          <Container className="d-flex flex-row justify-content-end gap-2">
            <Button disabled>
              <FontAwesomeIcon icon={faPlay} />
            </Button>
            <Button variant="outline-danger" disabled>
              <FontAwesomeIcon icon={faStop} />
            </Button>
          </Container>
        </Card.Body>
      );
    }
  };

  return <Card className="h-100 flex-fill">{content()}</Card>;
}
