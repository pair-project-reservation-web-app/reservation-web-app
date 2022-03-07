import styles from './Select.module.css';

const Select = (props) => {

    return (
        <select
            name={props.name}
            id={props.id}
            onChange={props.onChange}
            className={styles.container}
        >
            <option value="Choose one">Choose One</option>
            {props.options.map((item) =>
                <option
                    key={item.label}
                    value={item.value}
                    className={styles.option}
                >{item.label}</option>
            )}
        </select>
    )
};

export default Select;