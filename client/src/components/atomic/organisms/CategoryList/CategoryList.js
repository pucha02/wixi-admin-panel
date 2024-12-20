import React from 'react';
import SubmitFormButtonAtom from '../../atoms/FormButtons/SubmitFormButton';
import DeleteElementButtonAtom from '../../atoms/FormButtons/DeleteElementButton';

import './CategoryList.css';

const CategoryList = ({ categories, onEdit, onDelete }) => {
    return (
        <div className="category-list">
            <h2>Список категорій</h2>
            <ul>
                
                {categories.map((category) => (
                    <li key={category._id}>
                        {category.title}
                        {console.log(category)}
                        <SubmitFormButtonAtom label="Редагувати" onClick={() => onEdit(category)} />
                        <DeleteElementButtonAtom onClick={() => onDelete(category._id)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
