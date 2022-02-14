import { Routes, Route } from 'react-router-dom';
import Tables from '../components/Reservation/Tables';
import Reviews from '../components/Review/Reviews';
import Login from '../components/Login/Login';
import Register from '../components/Login/Register';
import Reservation from '../components/Reservation/Reservation';
import UserResStatus from '../components/Reservation/UserResStatus';
import Review from '../components/Review/Review';


const PublicRoute = (props) => {

    return (
        <Routes>

            <Route path="/login" element={<Login onLogin={props.userStatusHandler} />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={
                <div>
                    <Tables />
                    <Reservation />
                    <UserResStatus />
                    <Review />
                    <Reviews />
                </div>} />

        </Routes>
    )
};

export default PublicRoute;