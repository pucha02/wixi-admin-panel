import React from 'react';

const Input = ({ label, type = 'text', value, onChange, name=null }) => {
    return (
        <div>
            <label>{label}</label>
            <input type={type} value={value} onChange={onChange} name={name} />
        </div>
    );
};

export default Input;
