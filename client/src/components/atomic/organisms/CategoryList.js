import React from 'react';
import Button from '../atoms/Button';

const CategoryList = ({ categories, onEdit }) => {
    return (
        <div>
            <h2>Category List</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category._id}>
                        {category.title}
                        <Button label="Edit" onClick={() => onEdit(category)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
