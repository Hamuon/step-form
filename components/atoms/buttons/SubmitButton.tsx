import React from 'react';
const SubmitButton = (props: any) => {
    return (
        <button disabled={props.loading} type={props.type} {...props} onClick={props.handleClick} className={`btn min-w-24 text-white bg-button-primary-color  hover:bg-button-secondary-color ${props.className}`}>
            {props.loading ? <span className="loading loading-spinner"></span> : props.text}
        </button>
    );
};

export default SubmitButton;