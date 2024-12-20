import React from 'react';
import SubmitFormButtonAtom from '../../atoms/FormButtons/SubmitFormButton';
import DeleteElementButtonAtom from '../../atoms/FormButtons/DeleteElementButton';

import './PromocodeList.css';

const PromocodeList = ({ promocodes, onEdit, onDelete }) => {
    return (
        <div className="category-list">
            <h2>Список промокодів</h2>
            <ul>
                
                {promocodes.map((promocode) => (
                    <li key={promocode._id}>
                        {promocode.code} - {promocode.discountPercentage}%
                        {console.log(promocode)}
                        <SubmitFormButtonAtom label="Редагувати" onClick={() => onEdit(promocode)} />
                        <DeleteElementButtonAtom onClick={() => onDelete(promocode._id)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PromocodeList;
