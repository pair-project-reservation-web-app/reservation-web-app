import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Select from "react-select";
import Axios from "axios";
import styles from './Tables.module.css'

const Tables = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPartySize, setSelectedPartySize] = useState("");

  const [selectedTimeEnd, setSelectedTimeEnd] = useState("");
  const [userData, setUserData] = useState([]);
  const tables = [
    { name: "table1", id: 1, partySize: 2 },
    { name: "table2", id: 2, partySize: 2 },
    { name: "table3", id: 3, partySize: 2 },
    { name: "table4", id: 4, partySize: 4 },
    { name: "table5", id: 5, partySize: 4 },
    { name: "table6", id: 6, partySize: 4 },
    { name: "table7", id: 7, partySize: 4 },
    { name: "table8", id: 8, partySize: 4 },
    { name: "table9", id: 9, partySize: 6 },
    { name: "table10", id: 10, partySize: 6 },
    { name: "table11", id: 11, partySize: 6 },
    { name: "table12", id: 12, partySize: 6 },
    { name: "table13", id: 13, partySize: 8 },
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

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/current-reservation-status/?date=${selectedDate}&time=${selectedTime}&timeEnd=${selectedTimeEnd}`).then(
      (response) => {
        // need to add error handle or initial value for api call
        // console.log(response.data)
        setUserData(response.data);
      }
    );

    // console.log('updated')
  }, [selectedDate, selectedTime, selectedTimeEnd]);

  const partySize = [
    { value: 2, label: 2 },
    { value: 4, label: 4 },
    { value: 6, label: 6 },
    { value: 8, label: 8 },
  ];

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


    setSelectedTime(dineinBefore);
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

  const submitHandler = (e) => {
    e.preventDefault();

    // Axios.post("http://localhost:8080/api/reservation", {
    //   dineinDate: selectedDate,
    //   dineinTime: selectedTime,
    //   dineinTimeEnd: selectedTimeEnd,
    //   partySize: selectedPartySize
    // }).then((response) => {
    //   // error handling
    //   if (response.data.code) {
    //     console.log(response.data.code)
    //   } else {
    //     console.log(response.data);
    //     setUserData(response.data);
    //   }

    // });

  };

  const filterTables = (table, userData, selectedPartySize) => {
    // console.log(userData)
    if (userData.length > 0) {

      if (selectedPartySize === '') {
        return userData.some((item) => item.tableId === table.id)
      }

      return userData.some((item) => item.tableId === table.id || table.partySize !== selectedPartySize
      )
    } else {
      // console.log('no user data')
      if (selectedPartySize === '') {
        return false
      }
      return table.partySize !== selectedPartySize
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="reservationDate">Date</label>
        <input type="date" onChange={reservationDateHandler} />

        <Select options={time} onChange={userTimeHandler} />

        <Select options={partySize} onChange={userPartySizeHandler} />
        {/* <button>Submit</button> */}
      </form>

      <div className={styles['table-container']}>
        {tables.map((table, index) => (
          <div
            className={filterTables(table, userData, selectedPartySize) ? "unavailable" : "table"}
            key={index}
          >
            <h3>{table.name}</h3>
            <h3>{table.partySize}</h3>
            <Link to="/booking-table" state={{
              userDate: selectedDate,
              userTime: selectedTime,
              userTable: table.id,
            }}>book</Link>
            <button>check available time?</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tables;
