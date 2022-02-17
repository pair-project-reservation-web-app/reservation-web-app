import "./Modal.css";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.modalDisplayHandler} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={props.modalDisplay}>
      <h1>{props.modalMessage}</h1>
      <button onClick={props.modalDisplayHandler}>close</button>
    </div>
  );
};

const Modal = (props) => {
  const display = props.display ? "modal display" : "modal";

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop
          modalDisplay={display}
          modalDisplayHandler={props.displayHandler}
        />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          modalDisplay={display}
          modalMessage={props.message}
          modalDisplayHandler={props.displayHandler}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Modal;
