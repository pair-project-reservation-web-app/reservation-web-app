import { useEffect, useState, useContext, Fragment } from "react";
import Axios from "axios";
import AuthContext from "../../store/auth-context";
import ReviewBundle from "./ReviewsBundle";

const Reviews = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [order, setOrder] = useState("DESC");
  const [orderBy, setOrderBy] = useState("rating");

  const ctx = useContext(AuthContext);

  useEffect(() => {
    Axios.get(
      `http://localhost:8080/api/reviews/?order=${order}&orderBy=${orderBy}`
    ).then((res) => {
      if (!res.data.status) {
        console.log(res.data.message);
        //console.log(res.data);
      } else {
        setUserReviews(res.data.message);
      }
    });
  }, [order, orderBy, ctx]);

  const starClickHandler = (e) => {
    e.preventDefault();
    if (orderBy === "likes") {
      setOrderBy("rating");
    } else {
      if (order === "") {
        setOrder("DESC");
      } else {
        setOrder("");
      }
    }
  };
  const likesClickHander = (e) => {
    e.preventDefault();
    if (orderBy === "rating") {
      setOrderBy("likes");
    } else {
      if (order === "") {
        setOrder("DESC");
      } else {
        setOrder("");
      }
    }
  };
  const userClickHandler = (e) => {
    const id = +e.target.getAttribute("data-key");
    Axios.get(`http://localhost:8080/api/reviews/${id}`).then((res) => {
      if (res.data.status) {
        setUserReviews(res.data.message);
      } else {
        console.log(res.data.message);
      }
    });
  };

  if (userReviews.length > 0) {
    return (
      <Fragment>
        <div className="wrapper">
          <h1>Reviews</h1>
          <button onClick={starClickHandler}>star</button>
          <button onClick={likesClickHander}>like</button>
          <ReviewBundle
            reviews={userReviews}
            userClickHandler={userClickHandler}
          />
        </div>
      </Fragment>
    );
  } else {
    return (
      <div>
        <h1>REVIEW EMPTY ERROR</h1>
      </div>
    );
  }
};

export default Reviews;
