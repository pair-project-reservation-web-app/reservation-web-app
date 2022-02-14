import { useEffect, useState, useContext, Fragment } from "react";
import Axios from "axios";
import AuthContext from "../../store/auth-context";
import Modal from "../Layout/Modal";

const Reviews = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [order, setOrder] = useState("DESC");
  const [orderBy, setOrderBy] = useState("rating");

  const ctx = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [modalDisplay, setModalDisplay] = useState(false);

  const displayHandler = (e) => {
    e.preventDefault();
    setModalDisplay(false);
  };

  useEffect(() => {
    Axios.get(
      `http://localhost:8080/api/reviews/?order=${order}&orderBy=${orderBy}`
    ).then((res) => {
      if (res.data) {
        setUserReviews(res.data);

        //console.log(res.data);
      }
    });
  }, [order, orderBy]);

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
      if (res.data) {
        setUserReviews(res.data);
      }
    });
  };

  const userLikeClickHandler = (e) => {
    e.preventDefault();
    const userId = ctx.userId;
    const reviewId = e.target.getAttribute("data-key");
    let likes = JSON.parse(e.target.getAttribute("data-key2"));
    //console.log(userLikes);
    if (!likes.some((el) => el === userId)) {
      likes.push(userId);
    } else if (likes.some((el) => el === userId)) {
      const index = likes.indexOf(userId);
      likes.splice(index, 1);
    }

    Axios.put("http://localhost:8080/api/reviews/like", {
      array: JSON.stringify(likes),
      id: reviewId,
    }).then((response) => {
      console.log(response);
    });
  };
  const deleteClickHandler = (e) => {
    console.log(e.target.getAttribute("data-key"));
    const reviewId = e.target.getAttribute("data-key");
    Axios.delete(`http://localhost:8080/api/reviews/${reviewId}`).then(
      (response) => {
        //console.log(response);
        setErrorMessage(response.data);
        setModalDisplay(true);
      }
    );
  };

  if (userReviews.length > 0) {
    return (
      <Fragment>
        <div>
          <h1>Reviews</h1>
          <button onClick={starClickHandler}>star</button>
          <button onClick={likesClickHander}>like</button>
          {userReviews.map((content, index) => (
            <div key={index}>
              <h3 data-key={content.userID} onClick={userClickHandler}>
                User Name: {content.userFullName}
              </h3>
              <h3>Review: {content.reviewText}</h3>
              <h3>Stars: {content.rating}</h3>
              <h3
                data-key={content.id}
                data-key2={content.likes}
                onClick={userLikeClickHandler}
              >
                Likes: {JSON.parse(content.likes).length}
              </h3>
              <button
                data-key={content.id}
                disabled={ctx.userId === content.userID ? false : true}
                onClick={deleteClickHandler}
              >
                delete
              </button>
            </div>
          ))}
        </div>
        <Modal
          display={modalDisplay}
          displayHandler={displayHandler}
          message={errorMessage}
        />
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
