import { useState, useEffect } from 'react';
import Axios from "axios";


const UserResStatus = ({ userId }) => {
    const [currentStatus, setCurrentStatus] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:8080/api/reservation-status/${userId}`).then((response) => {
            setCurrentStatus(response.data)
        });

    }, [userId]);

    const deleteReservation = (reservationId) => {
        Axios.delete(`http://localhost:8080/api/reservation-cancel/${reservationId}`).then((response) => {

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