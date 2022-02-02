import { useState } from 'react';
import Select from 'react-select'
import Axios from 'axios';

const Tables = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedChair, setSelectedChair] = useState('')

    const [selectedTimeEnd, setSelectedTimeEnd] = useState('');
    const [userData, setUserData] = useState('')

    const time = [
        { value: '11:00', label: '11:00' },
        { value: '11:30', label: '11:30' },
        { value: '12:00', label: '12:00' },
        { value: '12:30', label: '12:30' },
        { value: '13:00', label: '13:00' },
        { value: '13:30', label: '13:30' },
        { value: '14:00', label: '14:00' },
        { value: '14:30', label: '14:30' },
        { value: '15:00', label: '15:00' },
        { value: '15:30', label: '15:30' },
        { value: '16:00', label: '16:00' },
        { value: '16:30', label: '16:30' },
        { value: '17:00', label: '17:00' },
        { value: '17:30', label: '17:30' },
        { value: '18:00', label: '18:00' },
        { value: '18:30', label: '18:30' },
        { value: '19:00', label: '19:00' },
    ];

    const chair = [
        { value: 2, label: 2 },
        { value: 4, label: 4 },
        { value: 8, label: 8 },
    ]

    const reservationDateHandler = (e) => {
        setSelectedDate(e.target.value);
    }

    const userChairHandler = (input) => {
        setSelectedChair(input.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:8080/api/reservation", {
            dineinDate: selectedDate,
            dineinTime: selectedTime,
            dineinTimeEnd: selectedTimeEnd,
        }).then((response) => {

            setUserData(response.data[0].dineinTime);
        });
        console.log(selectedDate, selectedTime, selectedChair, selectedTimeEnd)
    }



    const userTimeHandler = (input) => {
        setSelectedTime(input.value);
        const time = input.value;

        const [hours, min] = time.split(':');
        const convertToInt = +hours;
        const result = `${convertToInt + 2}:${min}`;

        setSelectedTimeEnd(result);

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
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="reservationDate">Date</label>
                <input type="date" onChange={reservationDateHandler} />

                <Select
                    options={time}
                    onChange={userTimeHandler}
                />

                <Select
                    options={chair}
                    onChange={userChairHandler}
                />

                <button>ddd</button>
            </form>

            <h2>{userData}</h2>
        </div>
    )
};

export default Tables;