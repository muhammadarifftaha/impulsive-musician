import { faPlayCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Card } from "react-bootstrap";
const Octavian = require("octavian");

function ChordButtons({ chordData, addToProgression, audioPlayer }) {
  const { note, chord, octave } = chordData;

  const playChord = () => {
    audioPlayer.stop();
    const notes = new Octavian.Chord(`${note}${octave}`, chord).signatures;
    notes.forEach((note) => audioPlayer.play(note));
    audioPlayer.play(note + (octave - 1));
  };

  return (
    <Card className="flex-fill chord-list-btns">
      <Card.Body className="d-flex justify-content-between align-items-center gap-3">
        {note + chord}
        <ButtonGroup>
          <Button type="button" variant="outline-primary" onClick={playChord}>
            Play <FontAwesomeIcon icon={faPlayCircle} />
          </Button>
          <Button
            type="button"
            variant="outline-primary"
            onClick={() => {
              addToProgression(chordData);
            }}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}

export default ChordButtons;
