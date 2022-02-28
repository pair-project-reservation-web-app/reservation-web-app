import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import AuthContext from "../../store/auth-context";
import styles from './UserResStatus.module.css'

const UserResStatus = () => {
  const ctx = useContext(AuthContext);

  const [currentStatus, setCurrentStatus] = useState([]);

  useEffect(() => {
    Axios.get(
      `https://reservation-mysql.herokuapp.com/api/reservation-status/${ctx.userId}`
    ).then((response) => {
      //console.log(response.data)
      if (!response.data.status) {
        ctx.setModalHandler(response.data.message);
      } else {
        setCurrentStatus(response.data.message);
      }
    });
  }, [ctx]);

  const deleteReservation = (reservationId) => {
    Axios.delete(
      `https://reservation-mysql.herokuapp.com/api/reservation-cancel/${reservationId}`
    ).then((response) => {
      if (!response.data.status) {
        ctx.setModalHandler(response.data.message);
      } else {
        ctx.setModalHandler("Reservation canceled");
      }
    });
  };

  return (
    <div className="wrapper">
      <div className={styles['status-container']}>
      <h2>Current Reservation Status</h2>
      {currentStatus.map((item) => (
        <div className={styles.status} key={item.tableId}>
          <h3>Date : {item.dineinDate.split("T")[0]}</h3>
          <h3>Time : {item.dineinTime}</h3>
          <h3>Table: {item.tableId}</h3>
          <button onClick={deleteReservation.bind(null, item.Id)}>
            Cancel
          </button>
        </div>
      ))}
      </div>
    </div>
  );
};

export default UserResStatus;
