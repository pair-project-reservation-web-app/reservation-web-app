import React from 'react';
import ReactDOM from 'react-dom'
import styles from './ReservationModal.module.css';

const Backdrop = (props) => {
  return (
    <div className={styles.backdrop} onClick={() => { }}></div>
  )
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <header>
        <h2>Reservation confirm page</h2>
      </header>
      <div>
        <p>{props.tableName}</p>
        <p>{props.date}</p>
        <p>{props.time}</p>
        <p>{props.size}</p>

        <button onClick={props.bookingTable}> confirm</button>
        <button onClick={() => props.modalHandler(false)}>Close</button>
      </div>
    </div>
  )
}

const Reservation = (props) => {

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
      {ReactDOM.createPortal(<ModalOverlay
        tableName={props.tableName}
        date={props.date}
        time={props.time}
        size={props.size}
        bookingTable={props.bookingTable}
        modalHandler={props.modalHandler}

      />, document.getElementById('overlay-root'))}
    </React.Fragment>
  );
};

export default Reservation;
