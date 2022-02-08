import styles from './Input.module.css';

const Input = (props) => {
    return (
        <div className={props.isValid === false ? styles.invalid : ''}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                placeholder={props.placeholder}
                type={props.type}
                value={props.value}
                onChange={props.onChange}

            />
        </div>
    )
};

export default Input;