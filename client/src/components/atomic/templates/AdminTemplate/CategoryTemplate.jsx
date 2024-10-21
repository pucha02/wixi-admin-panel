import React from 'react';
import CategoryForm from '../../organisms/CategoryForm/CategoryForm';
import CategoryList from '../../organisms/CategoryList/CategoryList';

import './AdminTemplate.css';

const CategoryTemplate = ({
    categories,
    onCreateCategory,
    onEditCategory,
    categoryToEdit,
    onEditCategoryInitiate,
    onDeleteCategory,
}) => {
    return (
        <div className="admin-template">
            <h1>Admin Panel</h1>
            
            <div className="category-section">
                <h2>Створити категорію</h2>
                <CategoryForm 
                    onSubmit={categoryToEdit ? (data) => onEditCategory(categoryToEdit._id, data) : onCreateCategory} 
                    categoryToEdit={categoryToEdit}
                />
                <CategoryList 
                    categories={categories} 
                    onEdit={onEditCategoryInitiate} 
                    onDelete={onDeleteCategory}
                />
            </div>          
        </div>
    );
};

export default CategoryTemplate;