import { useState } from 'react';
import Select from 'react-select/dist/declarations/src/Select';

const UserSelectForm = () => {

    return (
        <form>
            {/* Do we need submit button? */}
            <label htmlFor="reservationDate">Date</label>
            <input type="date" onChange={reservationDateHandler} />
            <Select options={time} onChange={userTimeHandler} />
            <Select options={partySize} onChange={userPartySizeHandler} />
        </form>
    )
};

export default UserSelectForm;