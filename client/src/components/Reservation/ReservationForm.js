import styles from './ReservationForm.module.css';
import Input from '../UI/Input/Input'
import Select from '../UI/Select/Select';
// import Select from "react-select";


const ReservationForm = (props) => {

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

    const partySize = [
        { value: 2, label: 2 },
        { value: 4, label: 4 },
        { value: 6, label: 6 },
        { value: 8, label: 8 },
    ];
    return (
        <form className={styles['form-container']}>
            {/* <label htmlFor="reservationDate" className={styles['sr-only']}>Date</label>
            <input className={styles['input-date']}
                type="date"
                defaultValue={props.today}
                onChange={props.reservationDateHandler} /> */}
            <Input
                id='userDate'
                label='date'
                type='date'
                defaultValue={props.today}
                onChange={props.reservationDateHandler}
            />

            <Select
                options={time}
                onChange={props.userTimeHandler}
            />

            <Select
                options={partySize}
                onChange={props.userPartySizeHandler}
            />

            {/* <Select
                options={time}
                className={styles.container}
                classNamePrefix='react-select'
                // classNamePrefix={styles.container}
                onChange={props.userTimeHandler} />
            <Select
                options={partySize}
                className={styles.container}
                onChange={props.userPartySizeHandler}
            /> */}
        </form>
    );
};

export default ReservationForm;