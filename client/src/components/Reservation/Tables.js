import { useState, useEffect, useContext } from "react";
import ReservationForm from './ReservationForm';
import Axios from "axios";
import AuthContext from "../../store/auth-context";
import Table from './Table';
import styles from "./Tables.module.css";

const Tables = () => {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPartySize, setSelectedPartySize] = useState("");
  const [selectedTimeBefore, setSelectedTimeBefore] = useState("");
  const [selectedTimeEnd, setSelectedTimeEnd] = useState("");
  const [reservationList, setReservationList] = useState([]);

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

  useEffect(() => {
    Axios.get(
      `https://reservation-mysql.herokuapp.com/api/current-reservation-status/?date=${selectedDate}&time=${selectedTimeBefore}&timeEnd=${selectedTimeEnd}`,
    ).then((response) => {
      // need to add error handle or initial value for api call
      if (!response.data.status) {
        ctx.setModalHandler(response.data.message);
      } else {
        setReservationList(response.data.message);
      }
    });
  }, [selectedDate, selectedTimeBefore, selectedTimeEnd, ctx]);


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

  };

  const filterTables = (table, reservationList, selectedPartySize) => {
    if (reservationList.length > 0) {
      if (selectedPartySize === "") {
        return reservationList.some((item) => item.tableId === table.id);
      } else {

        return reservationList.some(
          (item) =>
            item.tableId === table.id || table.partySize !== selectedPartySize
        );
      }

    } else {
      if (selectedPartySize === "") {
        return false;
      } else {
        return table.partySize !== selectedPartySize;
      }
    }
  };



  return (
    <>
      <section className={styles['reservation-container']}>
        <div className='wrapper'>
          <ReservationForm
            today={today}
            reservationDateHandler={reservationDateHandler}
            userTimeHandler={userTimeHandler}
            userPartySizeHandler={userPartySizeHandler}
          />

          <ul className={styles["table-container"]}>
            <li className={styles['window']}><p>Window</p></li>
            <li className={styles['entrance']}><p>Entrance</p></li>
            <li className={styles['restrooms']}><p>Restrooms</p></li>
            {tables.map(table => <Table
              key={table.id}
              tableId={table.id}
              table={table}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              filterTables={filterTables.bind(null, table, reservationList, selectedPartySize)}
            />)}
          </ul>
        </div>

      </section >

    </>
  );
};

export default Tables;
