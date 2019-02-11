import React from 'react';

import styles from './Button.module.scss';


const Button = (props) => {
    
    let type = props.type ? props.type : '';
    let text = props.text ? props.text : '';
    let classes = props.classes ? props.classes : '';

    return <button className={[styles.button, classes].join(' ')} type={type}>{text}</button>
}

export default Button;