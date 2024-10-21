import React from 'react';
import SizeForm from '../../organisms/SizeForm/SizeForm';
import SizeList from '../../organisms/SizeList/SizeList';

import './AdminTemplate.css';

const SizeTemplate = ({
    sizes,
    onCreateSize,
    onEditSize,
    sizeToEdit,
    onEditSizeInitiate,
    onDeleteSize
}) => {
    return (
        <div className="admin-template">
            <h1>Admin Panel</h1>
            <div className="category-section">
                <h2>Створити розмір</h2>
                <SizeForm 
                    onSubmit={sizeToEdit ? (data) => onEditSize(sizeToEdit._id, data) : onCreateSize} 
                    sizeToEdit={sizeToEdit}
                />
                <SizeList 
                    sizes={sizes} 
                    onEdit={onEditSizeInitiate} 
                    onDelete={onDeleteSize}
                />
            </div>
        </div>
    );
};

export default SizeTemplate;