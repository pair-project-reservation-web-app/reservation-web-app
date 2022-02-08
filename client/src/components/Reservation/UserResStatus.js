import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import AuthContext from '../../store/auth-context';


const UserResStatus = () => {

  const ctx = useContext(AuthContext);

  const [currentStatus, setCurrentStatus] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/reservation-status/${ctx.userId}`).then(
      (response) => {
        //console.log(response.data)
        setCurrentStatus(response.data);
      }
    );
  }, [ctx.userId]);

  const deleteReservation = (reservationId) => {
    Axios.delete(
      `http://localhost:8080/api/reservation-cancel/${reservationId}`
    ).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <h2>Current Reservation Status</h2>

      {currentStatus.map((item) => (
        <div className="box">
          <h3>Date : {item.dineinDate}</h3>
          <h3>Time : {item.dineinTime}</h3>
          <h3>Table: {item.tableId}</h3>
          <button onClick={deleteReservation.bind(null, item.Id)}>
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserResStatus;
