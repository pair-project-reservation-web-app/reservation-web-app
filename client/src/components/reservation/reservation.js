import { useState } from "react";
import Select from "react-select";
import Axios from "axios";

const Reservation = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [userData, setUserData] = useState("");

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

  const table = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
    { value: 11, label: 11 },
  ];

  const reservationDateHandler = (e) => {
    setSelectedDate(e.target.value);
  };

  const userTableHandler = (input) => {
    setSelectedTable(input.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8080/api/reservation-table", {
      tableId: selectedTable,
      dineinDate: selectedDate,
      dineinTime: selectedTime,
    }).then((response) => {
      setUserData(response.data);
    });
  };

  const userTimeHandler = (input) => {
    setSelectedTime(input.value);
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

  return (
    <div>
      <h1>Add Reservation</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="reservationDate">Date</label>
        <input type="date" onChange={reservationDateHandler} />

        <Select options={time} onChange={userTimeHandler} />

        <Select options={table} onChange={userTableHandler} />

        <button>ddd</button>
      </form>

      <h2>{userData}</h2>
    </div>
  );
};

export default Reservation;