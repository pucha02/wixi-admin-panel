import React from 'react';
import './Button.css'

const DeleteElementButtonAtom = ({ label, onClick, className='button' }) => {
    return <button className={className} onClick={onClick}>Видалити</button>;
};

export default DeleteElementButtonAtom;