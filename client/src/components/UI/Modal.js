import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.modalDisplayHandler} />;
};

const ModalOverlay = (props) => {

  return (
    <div className={styles.modal}>
      <header>
        <h1>Hello</h1>
      </header>
      <div className={styles['info-container']}>
        <h2>{props.modalMessage}</h2>
      </div>
      <div className={styles['btn-container']}>
        <button onClick={props.modalDisplayHandler}>close</button>
      </div>
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
