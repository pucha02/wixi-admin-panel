import React from 'react';
import './Input.css'

const Input = ({ label, type = 'text', value, onChange, name=null, className='input' }) => {
    return (
        <div>
            <label className='label'>{label}</label>
            <input className={className} type={type} value={value} onChange={onChange} name={name} />
        </div>
    );
};

export default Input;
