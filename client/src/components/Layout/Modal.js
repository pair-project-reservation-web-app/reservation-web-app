import "./Modal.css";

const Modal = (props) => {
  const display = props.display ? "modal display" : "modal";

  return (
    <div className={display}>
      <h1>{props.message}</h1>
      <button onClick={props.displayHandler}>close</button>
    </div>
  );
};

export default Modal;
