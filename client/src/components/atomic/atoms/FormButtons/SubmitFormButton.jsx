import React from 'react';
import './Button.css'

const SubmitFormButtonAtom = ({ label, onClick, className='button' }) => {
    return <button className={className} onClick={onClick}>{label}</button>;
};

export default SubmitFormButtonAtom;
