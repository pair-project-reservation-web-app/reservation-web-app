import { Fragment, useState, useContext } from "react";
import Select from "react-select";
import Axios from "axios";
import AuthContext from "../../store/auth-context";
import styles from './Review.module.css'

const Review = () => {
  const [userRating, setUserRating] = useState();
  const [userText, setUserText] = useState("");
  const fill = <ion-icon name="star"></ion-icon>
  const empty = <ion-icon name="star-outline"></ion-icon>

  const ctx = useContext(AuthContext);

  const ratings = [
    { value: 1, label: <div>{fill}{empty}{empty}{empty}{empty}</div> },
    { value: 2, label: <div>{fill}{fill}{empty}{empty}{empty}</div> },
    { value: 3, label: <div>{fill}{fill}{fill}{empty}{empty}</div> },
    { value: 4, label: <div>{fill}{fill}{fill}{fill}{empty}</div> },
    { value: 5, label: <div>{fill}{fill}{fill}{fill}{fill}</div> },
  ];

  const ratingHandler = (input) => {
    setUserRating(input.value);
  };

  const textAreaHandler = (e) => {
    setUserText(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8080/api/review", {
      rating: userRating,
      text: userText,
    }).then((response) => {
      if (response.data.status) {
        ctx.setModalHandler(response.data.message);
      } else {
        ctx.setModalHandler(response.data.message);
      }
    });
  };

  return (
    <Fragment>
      <div className="wrapper">
        <div className={styles['review-container']}>
        <form onSubmit={submitHandler}>
          <div className={styles.rating}>
            <h3>Rate us!</h3>
            <div >
             {/* <label>Rating</label> */}
             <Select options={ratings} onChange={ratingHandler} />
            </div>
          </div>
          <div className={styles.comment}>
            {/* <label>Comment</label> */}
            <textarea onChange={textAreaHandler}></textarea>
          </div>
          <button>Add</button>
        </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Review;
