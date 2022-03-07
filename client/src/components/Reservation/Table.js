import { useState, useContext } from 'react';
import AuthContext from "../../store/auth-context";
import Axios from "axios";
import ReservationModal from './ReservationModal';
import styles from './Table.module.css';

const Table = (props) => {
  const [bookingModal, setBookingModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const ctx = useContext(AuthContext);

  const bookingTable = (tableId, partySize, dineinDate, dineinTime) => {
    Axios.post("https://reservation-mysql.herokuapp.com/api/reservation-table", {
      tableId,
      partySize,
      dineinDate,
      dineinTime,
    }).then((res) => {
      if (!res.data.status) {
        ctx.setModalHandler(res.data.message);
      } else {
        ctx.setModalHandler("Booked!");
        setBookingModal(false);
      }
    });
  };

  const modalHandler = (table, date, time) => {
    const userData = {
      id: table.id,
      tableName: table.name,
      partySize: table.partySize,
      date,
      time,
    };
    setModalData(userData);
    setBookingModal(true);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: 'none',
      // backgroundColor: 'red',
      // color: 'white'
    })
  }


  return (
    <>
      <li className={`
    ${styles.table} 
    ${styles['table-' + props.tableId]}
    ${props.filterTables() ? styles.unavailable : ''}
    `}>
        <h3><ion-icon name="body-outline"></ion-icon> {props.table.partySize}</h3>
        {!props.filterTables() && props.selectedDate && props.selectedTime && <button className={styles.bookingBtn} onClick={
          modalHandler.bind(null, props.table, props.selectedDate, props.selectedTime)
        }>Book</button>}
        {/* {props.filterTables(props.table, props.reservationList, props.selectedPartySize) && <button className={styles.checkBtn}>Available Time</button>} */}
      </li >

      {bookingModal && <ReservationModal
        tableName={modalData.tableName}
        date={modalData.date}
        time={modalData.time}
        size={modalData.partySize}
        bookingTable={bookingTable.bind(null, modalData.id, modalData.partySize, modalData.date, modalData.time)}
        modalHandler={setBookingModal}
      />}
    </>

  )
};

export default Table;