import { useEffect, useState, Fragment, useContext } from "react";
import AuthContext from "../../store/auth-context";
import styles from "./ReviewsBundle.module.css";
import Axios from "axios";
import Stars from "../UI/Stars/Stars";

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
    const reviewId = e.target.parentElement.getAttribute("data-key");
    Axios.delete(`https://mysql-deploy-test-1.herokuapp.com/api/reviews/${reviewId}`).then(
      (response) => {
        //console.log(response);
        ctx.setModalHandler(response.data.message);
      }
    );
  };
  const userLikeClickHandler = (e) => {
    e.preventDefault();
    const userId = ctx.userId;
    const reviewId = e.target.parentElement.getAttribute("data-key");
    let likes = JSON.parse(e.target.parentElement.getAttribute("data-key2"));
    //console.log(userLikes);
    if (userId) {
      if (!likes.some((el) => el === userId)) {
        likes.push(userId);
      } else if (likes.some((el) => el === userId)) {
        const index = likes.indexOf(userId);
        likes.splice(index, 1);
      }
      Axios.put("https://mysql-deploy-test-1.herokuapp.com/api/reviews/like", {
        array: JSON.stringify(likes),
        id: reviewId,
      }).then((response) => {
        ctx.setModalHandler("Confirmed");
      });
    }
  };

  return (
    <Fragment>
      {reviews.slice(firstPageIndex, lastPageIndex).map((content, index) => (
        <div
          className={`${styles.reviews} ${index % 2 && styles.right}`}
          key={index}
        >
          <div className={styles["review-text"]}>
            <h3 data-key={content.userID} onClick={props.userClickHandler}>
              {content.userFullName}
            </h3>
            <h3 className={styles.comment}>{content.reviewText}</h3>
          </div>
          <div className={styles["reviews-val"]}>
            <div className={styles['reviews-icons']}>
              <h3 className={styles.stars}>
                <Stars rating={content.rating} />
              </h3>
              <h3
                className={styles.thumbs}
                data-key={content.id}
                data-key2={content.likes}
                onClick={userLikeClickHandler}
              >
                <ion-icon className={styles.thumbs} name="thumbs-up"></ion-icon>{" "}
                {JSON.parse(content.likes).length}
              </h3>
            </div>
            <button
              className={styles.delete}
              data-key={content.id}
              disabled={ctx.userId === content.userID ? false : true}
              onClick={deleteClickHandler}
            >
              {ctx.userId === content.userID && (
                <ion-icon name="close-circle"></ion-icon>
              )}
            </button>
          </div>
        </div>
      ))}
      <div className={styles["review-btn"]}>
        <button className={styles.btn} onClick={leftClickHandler}>
          <ion-icon name="caret-back"></ion-icon>
        </button>
        <span>{page}</span>
        <button className={styles.btn} onClick={rightClickHandler}>
          <ion-icon name="caret-forward"></ion-icon>
        </button>
      </div>
    </Fragment>
  );
};

export default ReviewBundle;
