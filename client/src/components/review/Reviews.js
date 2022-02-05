import { useEffect, useState } from "react";
import Axios from "axios";

const Reviews = (props) => {
  const [userReviews, setUserReviews] = useState([]);
  const [order, setOrder] = useState("DESC");
  const [orderBy, setOrderBy] = useState("rating");
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    Axios.get(
      `http://localhost:8080/api/reviews/?order=${order}&orderBy=${orderBy}`
    ).then((res) => {
      if (res.data) {
        setUserReviews(res.data);
        console.log(res.data);
      }
    });
  }, [order, orderBy]);

  const starClickHandler = (e) => {
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
      if (res.data) {
        setUserReviews(res.data);
      }
    });
  };

  const deleteClickHandler = (e) => {
    console.log(e.target.getAttribute("data-key"));
    const reviewId = e.target.getAttribute("data-key");
    Axios.delete(`http://localhost:8080/api/reviews/${reviewId}`).then(
      (response) => {
        console.log(response);
      }
    );
  };

  if (userReviews.length > 0) {
    return (
      <div>
        <h1>Reviews</h1>
        {userReviews.map((content, index) => (
          <div key={index}>
            <h3 data-key={content.userID} onClick={userClickHandler}>
              User Name: {content.userName}
            </h3>
            <h3>Review: {content.reviewText}</h3>
            <h3 onClick={starClickHandler}>Stars: {content.rating}</h3>
            <h3 onClick={likesClickHander}>Likes: {content.likes}</h3>
            <button
              data-key={content.id}
              disabled={props.userId === content.userID ? false : true}
              onClick={deleteClickHandler}
            >
              delete
            </button>
          </div>
        ))}
      </div>
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
