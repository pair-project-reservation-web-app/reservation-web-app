import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div
      className={`${styles["input-container"]} ${
        props.isValid === false ? styles.invalid : ""
      }`}
    >
      <label className={styles["sr-only"]} htmlFor={props.id}>
        {props.label}
      </label>
      <input
        id={props.id}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        maxLength={props.maxLength}
      />
    </div>
  );
};

export default Input;
