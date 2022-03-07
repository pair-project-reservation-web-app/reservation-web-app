import { Fragment } from "react";
import chairIcon from "../../../img/chair-solid.svg";
import tableIcon from "../../../img/square-solid.svg";
import styles from "./TableIcon.module.css";

const TableIcon = (props) => {
  const table = (customerNumbers) => {
    const customers = customerNumbers;
    const imgs = [];
    for (let index = 0; index < customers; index++) {
      imgs.push(

        <img
          className={`${styles[`chair-${index + 1}`]}`}
          src={chairIcon}
          alt="Table-icon"
        />
      );
    }
    // eslint-disable-next-line default-case
    switch (customers) {
      case 2:
        return (
          <div className={`${styles['table-icon-container']} ${styles[`table-container-${customers}`]}`}>
            {imgs.map((img) => (
              <>{img}</>
            ))}
            <img
              className={`${styles[`img-table-1`]}`}
              src={tableIcon}
              alt="Table-icon"
            />
          </div>
        );
      case 4:
        return (
          <div className={`${styles['table-icon-container']} ${styles[`table-container-${customers}`]}`}>
            {imgs.map((img) => (
              <>{img}</>
            ))}
            <img
              className={`${styles[`img-table-1`]}`}
              src={tableIcon}
              alt="Table-icon"
            />
          </div>
        );
      case 6:
        return (
          <div className={`${styles['table-icon-container']} ${styles[`table-container-${customers}`]}`}>
            {imgs.map((img) => (
              <>{img}</>
            ))}
            <img
              className={`${styles[`img-table-1`]}`}
              src={tableIcon}
              alt="Table-icon"
            />
            <img
              className={`${styles[`img-table-2`]}`}
              src={tableIcon}
              alt="Table-icon"
            />
          </div>
        );
      case 8:
        return (
          <div className={`${styles['table-icon-container']} ${styles[`table-container-${customers}`]}`}>
            {imgs.map((img) => (
              <>{img}</>
            ))}
            <img
              className={`${styles[`img-table-1`]}`}
              src={tableIcon}
              alt="Table-icon"
            />
            <img
              className={`${styles[`img-table-2`]}`}
              src={tableIcon}
              alt="Table-icon"
            />
            <img
              className={`${styles[`img-table-3`]}`}
              src={tableIcon}
              alt="Table-icon"
            />
            <img
              className={`${styles[`img-table-4`]}`}
              src={tableIcon}
              alt="Table-icon"
            />
          </div>
        );
    }
  };
  return <Fragment>{table(props.customers)}</Fragment>;
};

export default TableIcon;
