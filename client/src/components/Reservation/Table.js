import styles from './Table.module.css';

const Table = (props) => {
  const filterTables = (table, reservationList, selectedPartySize) => {
    if (reservationList.length > 0) {

      if (selectedPartySize === '') {
        return reservationList.some((reservation) => reservation.tableId === table.id)
      }

      return reservationList.some((item) => item.tableId === table.id || table.partySize !== selectedPartySize
      )
    } else {
      if (selectedPartySize === '') {
        return false
      }
      return table.partySize !== selectedPartySize
    }
  };

  return (
    <li className={`
        ${styles.table}
        ${filterTables(props.table, props.reservationList, props.selectedPartySize) ? styles.unavailable : ""}
      `}
    >
      <h3>{props.table.name}</h3>
      <h3>{props.table.partySize}</h3>

      {!filterTables(props.table, props.reservationList, props.selectedPartySize) &&
        props.selectedDate &&
        props.selectedTime && <button onClick={props.modalHandler.bind(null, props.table, props.selectedDate, props.selectedTime)}>book</button>}
      {filterTables(props.table, props.reservationList, props.selectedPartySize) && <button>check available time?</button>}
    </li>
  )
};

export default Table;