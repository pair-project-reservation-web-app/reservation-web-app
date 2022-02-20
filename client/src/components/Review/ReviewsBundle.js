import { useEffect, useState, Fragment, useContext } from "react";
import AuthContext from "../../store/auth-context";
import Axios from "axios";

const ReviewBundle = (props) => {
  const perPage = 8;
  const reviews = props.reviews;
  const lastPage = Math.ceil(reviews.length / perPage);
  const [page, setPage] = useState(1);
  const [firstPageIndex, setFirstPageIndex] = useState(0);
  const [lastPageIndex, setLastPageIndex] = useState(perPage);

  const ctx = useContext(AuthContext);

  useEffect(() => {
    setFirstPageIndex((page - 1) * perPage);
    setLastPageIndex(page * perPage);
  }, [page]);

  const leftClickHandler = (e) => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const rightClickHandler = (e) => {
    if (page < lastPage) {
      setPage(page + 1);
    }
  };

  const deleteClickHandler = (e) => {
    console.log(e.target.getAttribute("data-key"));
    const reviewId = e.target.getAttribute("data-key");
    Axios.delete(`http://localhost:8080/api/reviews/${reviewId}`).then(
      (response) => {
        //console.log(response);
        ctx.setModalHandler(response.data.message);
      }
    );
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
      ctx.setModalHandler("Confirmed");
    });
  };

  return (
    <Fragment>
      {reviews.slice(firstPageIndex, lastPageIndex).map((content, index) => (
        <div key={index}>
          <h3 data-key={content.userID} onClick={props.userClickHandler}>
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
      <button onClick={leftClickHandler}>
        <ion-icon name="caret-back"></ion-icon>
      </button>
      <span>{page}</span>
      <button onClick={rightClickHandler}>
        <ion-icon name="caret-forward"></ion-icon>
      </button>
    </Fragment>
  );
};

export default ReviewBundle;
