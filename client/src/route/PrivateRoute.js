import { Routes, Route } from "react-router-dom";
import Tables from "../components/Reservation/Tables";
import Reviews from "../components/Review/Reviews";
import Login from "../components/Login/Login";
import Register from "../components/Login/Register";

const PrivateRoute = (props) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Tables />
            <Reviews />
          </div>
        }
      />
      <Route
        path="/login"
        element={<Login onLogin={props.userStatusHandler} />}
      />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default PrivateRoute;
