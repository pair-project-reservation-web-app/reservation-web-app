import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import TableIcon from "../UI/TableIcon/TableIcon";
import Axios from "axios";
import ReservationModal from './ReservationModal';
import AuthContext from "../../store/auth-context";
// import Table from './Table';
import styles from "./Tables.module.css";

const Tables = () => {
  // today.getFullYear() +
  // "-" +
  // parseInt(today.getMonth() + 1) +
  // "-" +
  // today.getDate()
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPartySize, setSelectedPartySize] = useState("");
  const [selectedTimeBefore, setSelectedTimeBefore] = useState("");
  const [selectedTimeEnd, setSelectedTimeEnd] = useState("");
  const [reservationList, setReservationList] = useState([]);

  const [bookingModal, setBookingModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const ctx = useContext(AuthContext);

  const tables = [
    { name: "table1", id: 1, partySize: 2 },
    { name: "table2", id: 2, partySize: 2 },
    { name: "table3", id: 3, partySize: 2 },
    { name: "table4", id: 4, partySize: 2 },
    { name: "table5", id: 5, partySize: 4 },
    { name: "table6", id: 6, partySize: 4 },
    { name: "table7", id: 7, partySize: 4 },
    { name: "table8", id: 8, partySize: 4 },
    { name: "table9", id: 9, partySize: 4 },
    { name: "table10", id: 10, partySize: 4 },
    { name: "table11", id: 11, partySize: 6 },
    { name: "table12", id: 12, partySize: 6 },
    { name: "table13", id: 13, partySize: 6 },
    { name: "table14", id: 14, partySize: 8 },
    { name: "table15", id: 15, partySize: 8 },
  ];
  const time = [
    { value: "11:00", label: "11:00" },
    { value: "11:30", label: "11:30" },
    { value: "12:00", label: "12:00" },
    { value: "12:30", label: "12:30" },
    { value: "13:00", label: "13:00" },
    { value: "13:30", label: "13:30" },
    { value: "14:00", label: "14:00" },
    { value: "14:30", label: "14:30" },
    { value: "15:00", label: "15:00" },
    { value: "15:30", label: "15:30" },
    { value: "16:00", label: "16:00" },
    { value: "16:30", label: "16:30" },
    { value: "17:00", label: "17:00" },
    { value: "17:30", label: "17:30" },
    { value: "18:00", label: "18:00" },
    { value: "18:30", label: "18:30" },
    { value: "19:00", label: "19:00" },
  ];

  const partySize = [
    { value: 2, label: 2 },
    { value: 4, label: 4 },
    { value: 6, label: 6 },
    { value: 8, label: 8 },
  ];

  useEffect(() => {
    Axios.get(
      `https://reservation-mysql.herokuapp.com/api/current-reservation-status/?date=${selectedDate}&time=${selectedTimeBefore}&timeEnd=${selectedTimeEnd}`
    ).then((response) => {
      // need to add error handle or initial value for api call
      if (!response.data.status) {
        ctx.setModalHandler(response.data.message);
      } else {
        console.log(response.data)
        setReservationList(response.data.message);
      }
    });
  }, [selectedDate, selectedTimeBefore, selectedTimeEnd, bookingModal, ctx]);

  const bookingTable = (tableId, partySize, dineinDate, dineinTime) => {
    // if (partySize !== selectedPartySize) {
    //   console.log(' wrong info')
    // } else {
    // }

    Axios.post("https://reservation-mysql.herokuapp.com/api/reservation-table", {
      tableId,
      partySize,
      dineinDate,
      dineinTime,
    }).then((res) => {
      if (!res.data.status) {
        ctx.setModalHandler(res.data.message);
      } else {
        // ??
        ctx.setModalHandler("Booked!");

        setBookingModal(false);
      }
    });
  };

  const reservationDateHandler = (e) => {
    setSelectedDate(e.target.value);
  };

  const userPartySizeHandler = (input) => {
    setSelectedPartySize(input.value);
  };

  const userTimeHandler = (input) => {
    const time = input.value;

    const [hours, min] = time.split(":");
    const convertToInt = +hours;
    const dineinAfter = `${convertToInt + 2}:${min}`;
    const dineinBefore = `${convertToInt - 2}:${min}`;

    setSelectedTime(time);
    setSelectedTimeBefore(dineinBefore);
    setSelectedTimeEnd(dineinAfter);

    // let time = input.value
    // const [h, m] = time.split(':');
    // let totalSec = (+h) * 60 * 60 + (+m) * 60;
    // console.log(totalSec);
    // totalSec += 120 * 60;

    // console.log(totalSec);

    // let result = `${Math.floor((totalSec / 3600)) > 24 ? '0' + (Math.floor((totalSec / 3600)) - 24) : Math.floor((totalSec / 3600))
    //     }:${(totalSec % 3600) / 60 > 9 ? (totalSec % 3600) / 60 : (totalSec % 3600) / 60 + '0'
    //     }`
    // console.log(result)
  };

  const filterTables = (table, reservationList, selectedPartySize) => {
    if (reservationList.length > 0) {
      if (selectedPartySize === "") {
        return reservationList.some((item) => item.tableId === table.id);
      }

      return reservationList.some(
        (item) =>
          item.tableId === table.id || table.partySize !== selectedPartySize
      );
    } else {
      if (selectedPartySize === "") {
        return false;
      }
      return table.partySize !== selectedPartySize;
    }
  };

  const modalHandler = (table, date, time) => {
    const userData = {
      id: table.id,
      tableName: table.name,
      partySize: table.partySize,
      date,
      time,
    };
    console.log(table);
    setModalData(userData);
    setBookingModal(true);
  };


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: 'none',
      // backgroundColor: 'red',
      color: 'white'
    })
  }



  return (
    <>
      <section className={styles['reservation-container']}>
        <div className='wrapper'>
          <form className={styles['form-container']}>
            {/* Do we need submit button? */}
            <label htmlFor="reservationDate" className={styles['sr-only']}>Date</label>
            <input type="date" defaultValue={today} onChange={reservationDateHandler} />
            <Select
              options={time}
              styles={customStyles}
              className={styles.container}
              classNamePrefix='react-select'
              // classNamePrefix={styles.container}
              onChange={userTimeHandler} />
            <Select
              options={partySize}
              onChange={userPartySizeHandler}
              className={styles.container}
            />
          </form>

          <ul className={styles["table-container"]}>
            {/* {tables.map(table => <Table
            key={table.id}
            table={table}
            reservationList={reservationList}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            modalHandler={modalHandler}
            seletedPartySize={selectedPartySize}
          />)} */}
            <li className={styles['window']}><p>Window</p></li>
            <li className={styles['entrance']}><p>Entrance</p></li>
            <li className={styles['restrooms']}><p>Restrooms</p></li>
            {tables.map((table, index) => (
              <li
                className={`
              ${styles.table}
              ${styles['table-' + table.id]}
              ${filterTables(table, reservationList, selectedPartySize) ? styles.unavailable : ""}
            `}
                key={index}
              >

                <h3><ion-icon name="body-outline"></ion-icon> {table.partySize}</h3>

                {/* {<TableIcon customers={table.partySize} />} */}

                {!filterTables(table, reservationList, selectedPartySize) &&
                  selectedDate &&
                  selectedTime && <button className={styles.bookingBtn} onClick={modalHandler.bind(null, table, selectedDate, selectedTime)}>Book</button>}
                {/* {filterTables(table, reservationList, selectedPartySize) && <button className={styles.checkBtn}>Available Time</button>} */}
              </li>
            ))}
          </ul>
        </div>

      </section >

      {bookingModal && <ReservationModal
        tableName={modalData.tableName}
        date={modalData.date}
        time={modalData.time}
        size={modalData.partySize}
        bookingTable={bookingTable.bind(null, modalData.id, modalData.partySize, modalData.date, modalData.time)}
        modalHandler={setBookingModal}
      />}
    </>
  );
};

export default Tables;
