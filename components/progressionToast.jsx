import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faExclamationCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toast, ToastContainer } from "react-bootstrap";

function ProgressionToast({ showToast, setShowToast, toastMessage }) {
  const AllMessages = {
    noEmptyPosition: {
      title: "Progression Full",
      body: "Please remove a selected chord before inserting a new one",
      color: "red",
      icon: faExclamationCircle,
    },
    progressionEmpty: {
      title: "Progression Incomplete",
      body: "Please select 4 chords to play the progression",
      color: "red",
      icon: faExclamationCircle,
    },
    invalidTempo: {
      title: "Invalid Tempo",
      body: "Please choose between 40 to 200 bpm",
      color: "red",
      icon: faExclamationCircle,
    },
    saveSuccess: {
      title: "Progression Saved",
      body: "Your Progression has been saved",
      color: "green",
      icon: faCheckCircle,
    },
    unsavedChanges: {
      title: "Unsaved Changes",
      body: "You have unsaved changes",
      color: "orange",
      icon: faExclamationTriangle,
    },
    ServerError: {
      title: "Internal Server Error",
      body: "Server error. Please try again later or contact web administrator.",
      color: "orange",
      icon: faExclamationTriangle,
    },
    unknown: {
      title: "Unknown Error",
      body: "Unknown Error.Please try again later or contact web administrator.",
      color: "orange",
      icon: faExclamationTriangle,
    },
  };

  return (
    <ToastContainer position="bottom-end" className="m-2 position-fixed">
      <Toast
        onClose={() => {
          setShowToast(false);
        }}
        show={showToast}
        delay={5000}
        autohide
      >
        <Toast.Header closeButton={false}>
          {toastMessage === 0 ? (
            ""
          ) : (
            <FontAwesomeIcon
              icon={AllMessages[toastMessage].icon}
              color={AllMessages[toastMessage].color}
            />
          )}
          &nbsp;
          <strong className="me-auto">
            {toastMessage === 0 ? "" : AllMessages[toastMessage].title}
          </strong>
        </Toast.Header>
        <Toast.Body>
          {toastMessage === 0 ? "" : AllMessages[toastMessage].body}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ProgressionToast;
