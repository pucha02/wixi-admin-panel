import React from 'react';
import SubmitFormButtonAtom from '../../atoms/FormButtons/SubmitFormButton';
import DeleteElementButtonAtom from '../../atoms/FormButtons/DeleteElementButton';

import './SizeList.css';

const SizeList = ({ sizes, onEdit, onDelete }) => {
    return (
        <div className="category-list">
            <h2>Список розмірів</h2>
            <ul>
                {sizes.map((size) => (
                    <li key={size._id}>
                        {size.title}
                        <SubmitFormButtonAtom label="Редагувати" onClick={() => onEdit(size)} />
                        <DeleteElementButtonAtom onClick={() => onDelete(size._id)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SizeList;
