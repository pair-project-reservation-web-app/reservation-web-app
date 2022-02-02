import { useState } from 'react';
import Select from 'react-select'
import Axios from 'axios';

const Tables = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [userName, setUserName] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const reservationDateHandler = (e) => {
        setSelectedDate(e.target.value);
    }

    const userTableHandler = (e) => {
        setUserName(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();

        Axios.post('http://localhost:3001/register', {
            name: userName,
            date: selectedDate,
        }).then((response) => {
            console.log('submited');
        })

    }

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

    const userTimeHandler = (input) => {
        setSelectedTime(input.value);
    }

    return (
        <div>
            <form action="">
                <label htmlFor="reservationDate">Date</label>
                <input type="date" onChange={reservationDateHandler} />

                <Select
                    options={time}
                    onChange={userTimeHandler}
                />
            </form>
        </div>
    )
};

export default Tables;