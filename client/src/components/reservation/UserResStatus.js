import { useState, useEffect } from 'react';
import Axios from "axios";


const UserResStatus = ({ userId }) => {
    // const [date, setDate] = useState('');
    // const [time, setTime] = useState('');
    // const [table, setTable] = useState('');
    const [currentStatus, setCurrentStatus] = useState([]);

    useEffect(() => {
        Axios.post("http://localhost:8080/api/reservation-cancel", { userId: userId }).then((response) => {
            console.log(response.data);
            setCurrentStatus(response.data)
            // const { dineinTime, dineinDate, tableId } = response.data;
            // console.log(dineinTime);
            // setTime(dineinTime);
            // setTable(tableId);
            // setDate(dineinDate)
        });

        console.log(currentStatus)
    }, [userId])

    return <div>

        <h2>Current Reservation Status</h2>

        {currentStatus.map((item) => (
            <div className='box'>
                <h3>Date : {item.dineinDate}</h3>
                <h3>Time : {item.dineinTime}</h3>
                <h3>Table: {item.tableId}</h3>
            </div>
        ))}
        {/* <h3>{date}</h3>
        <h3>{time}</h3>
        <h3>{table}</h3> */}

    </div>
}

export default UserResStatus;