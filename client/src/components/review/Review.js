import { useEffect, useState } from "react";
import Select from "react-select";
import Axios from "axios";

const Review = () => {
  const [userRating, setUserRating] = useState();
  const [userText, setUserText] = useState("");

  const ratings = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
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
      console.log(response.data);
    });
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Rating starts</label>
        <Select options={ratings} onChange={ratingHandler} />
        <label>Comment</label>
        <textarea onChange={textAreaHandler}></textarea>
        <button>add</button>
      </form>
    </div>
  );
};

export default Review;
