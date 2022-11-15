import { ListGroup } from "react-bootstrap";
const Octavian = require("octavian");

export default function ViewChordCards({ chordData, audioPlayer }) {
  const { note, chord, octave } = chordData;

  function playChord() {
    if (note !== null) {
      audioPlayer.stop();
      const chordNotes = new Octavian.Chord(note + octave, chord).signatures;
      chordNotes.forEach((pitch) => {
        audioPlayer.play(pitch);
      });
    }
  }

  const content = () => {
    if (note !== null) {
      const chordNotes = new Octavian.Chord(note + octave, chord).signatures;

      return (
        <ListGroup.Item action onClick={playChord}>
          <h5>{note + chord}</h5>
          <p className="d-flex flex-row justify-content-evenly gap-3">
            <span>Notes : </span>
            {chordNotes.map((note, idx) => {
              return <span key={idx + "-" + note}>{note}</span>;
            })}
          </p>
        </ListGroup.Item>
      );
    } else {
      return (
        <ListGroup.Item action onClick={playChord}>
          <h5>No Chord</h5>
          <p className="d-flex flex-row justify-content-evenly gap-3">
            Incomplete chord data
          </p>
        </ListGroup.Item>
      );
    }
  };

  return <>{content()}</>;
}
