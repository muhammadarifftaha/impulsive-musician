/* eslint-disable react-hooks/exhaustive-deps */
import {
  faCirclePause,
  faPlayCircle,
  faStopCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const Octavian = require("octavian");

function Player({ chords, tempo, audioPlayer, displayToasts }) {
  const [playDisabled, setPlayDisabled] = useState(true);
  const [first, second, third, fourth] = chords;
  const interval = ((60 * 1000) / tempo) * 4;
  const timeOut = {
    timeoutID: "",
    timeout1: () => {
      timeOut.timeoutID = setTimeout(() => {
        stopPlayer();
        chordPlayer(second);
        timeOut.timeout2();
      }, interval);
    },
    timeout2: () => {
      timeOut.timeoutID = setTimeout(() => {
        stopPlayer();
        chordPlayer(third);
        timeOut.timeout3();
      }, interval);
    },
    timeout3: () => {
      timeOut.timeoutID = setTimeout(() => {
        stopPlayer();
        chordPlayer(fourth);
        timeOut.timeout4();
      }, interval);
    },
    timeout4: () => {
      timeOut.timeoutID = setTimeout(() => {
        stopPlayer();
        chordPlayer(first);
        timeOut.timeout1();
      }, interval);
    },
  };

  function chordPlayer(chordData) {
    const { note, octave, chord } = chordData;
    const notes = new Octavian.Chord(`${note}${octave}`, chord).signatures;
    notes.forEach((note) => audioPlayer.play(note));
    audioPlayer.play(note + (octave - 1));
  }

  function stopPlayer() {
    clearTimeout(timeOut.timeoutID);
    audioPlayer.stop();
  }

  function startPlayer() {
    if (
      first.note === null ||
      second.note === null ||
      third.note === null ||
      fourth.note === null
    ) {
      displayToasts("progressionEmpty");
      return;
    } else if (tempo < 40 || tempo > 200) {
      displayToasts("invalidTempo");
      return;
    } else {
      stopPlayer();
      chordPlayer(first);
      timeOut.timeout1();
    }
  }
  useEffect(() => {
    if (
      first.note === null ||
      second.note === null ||
      third.note === null ||
      fourth.note === null
    ) {
      setPlayDisabled(true);
    } else {
      setPlayDisabled(false);
    }
  });

  useEffect(() => () => {
    function stopPlayer() {
      clearTimeout(timeOut.timeoutID);
      if (audioPlayer !== null) {
        audioPlayer.stop();
      }
    }
    stopPlayer();
  });

  return (
    <>
      <Button
        variant="outline-primary"
        onClick={startPlayer}
        disabled={playDisabled}
      >
        Play <FontAwesomeIcon icon={faPlayCircle} />
      </Button>
      <Button variant="outline-danger" onClick={stopPlayer}>
        Stop <FontAwesomeIcon icon={faStopCircle} />
      </Button>
    </>
  );
}

export default Player;
