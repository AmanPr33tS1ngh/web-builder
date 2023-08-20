import React from 'react';
import './Button.css';
const Button = ({className="", onClickFunction, name, buttonName}) => {
    return(
        <button className={className} onClick={onClickFunction} name={name}>
            {buttonName}
        </button>
    )
}
export default Button;