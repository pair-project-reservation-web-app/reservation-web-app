import { useState, useEffect } from 'react';
import Axios from "axios";


const UserResStatus = ({ userId }) => {
    // const [date, setDate] = useState('');
    // const [time, setTime] = useState('');
    // const [table, setTable] = useState('');
    const [currentStatus, setCurrentStatus] = useState([]);

    useEffect(() => {
        Axios.post("http://localhost:8080/api/reservation-status", { userId: userId }).then((response) => {
            console.log(response.data);
            setCurrentStatus(response.data)
        });

        console.log(currentStatus)
    }, [userId]);

    const deleteReservation = (reservationId) => {
        Axios.post("http://localhost:8080/api/reservation-cancel", { reservationId: reservationId }).then((response) => {

            console.log(response);
        });
    }

    return <div>

        <h2>Current Reservation Status</h2>

        {currentStatus.map((item) => (
            <div className='box'>
                <h3>Date : {item.dineinDate}</h3>
                <h3>Time : {item.dineinTime}</h3>
                <h3>Table: {item.tableId}</h3>

                <button onClick={deleteReservation.bind(null, item.Id)}>Cancel</button>
            </div>
        ))}

    </div>
}

export default UserResStatus;