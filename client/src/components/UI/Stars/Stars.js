import { Fragment } from "react";
import styles from "./Stars.module.css";

const Stars = (props) => {
  const icons = {
    fill: <ion-icon name="star"></ion-icon>,
    empty: <ion-icon name="star-outline"></ion-icon>,
    half: <ion-icon name="star-half-outline"></ion-icon>,
  };

  let stars = [icons.empty, icons.empty, icons.empty, icons.empty, icons.empty];
  stars.forEach((element, i) => {
    if (props.rating - i >= 1) {
      stars[i] = icons.fill;
    } else if (1 > props.rating - i && props.rating - i > 0) {
      stars[i] = icons.half;
    }
  });
  return (
    <Fragment>
      <div className={styles.stars}>{stars.map((element) => element)}</div>
    </Fragment>
  );
};

export default Stars;
