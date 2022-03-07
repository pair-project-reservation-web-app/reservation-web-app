import { useEffect, useState, useContext, Fragment } from "react";
import Axios from "axios";
import AuthContext from "../../store/auth-context";
import ReviewBundle from "./ReviewsBundle";
import Stars from "../UI/Stars/Stars";
import styles from './Reviews.module.css'

const Reviews = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [order, setOrder] = useState("DESC");
  const [orderBy, setOrderBy] = useState("rating");
  const [avgRating, setAvgRating] = useState(null);
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

  useEffect(() => {
    let ratings = 0;
    userReviews.forEach((element) => {
      ratings += element.rating;
    });
    setAvgRating(ratings / userReviews.length);
  }, [userReviews]);

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
          <div className={styles['reviews-container']}>
            <h2 className={styles.title}>Reviews</h2>
            <div className={styles['avg-stars']}>
              <Stars rating={avgRating} />
            </div>
            <div className={styles['reviews-btn']}>
              <button onClick={starClickHandler}><ion-icon name="star"></ion-icon></button>
              <button onClick={likesClickHander}><ion-icon name="thumbs-up"></ion-icon></button>
            </div>
            <ReviewBundle
              reviews={userReviews}
              userClickHandler={userClickHandler}
            />
          </div>
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
