import React from 'react'

const Button = ({ text, fonction }) => {
    return (
        <button className="btn btn-primary" onClick={fonction}>
            {text}
        </button>
    );
}

export default Button;