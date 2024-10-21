import React from 'react';
import CategoryForm from '../../organisms/CategoryForm/CategoryForm';
import ProductForm from '../../organisms/ProductForm/ProductForm';
import CategoryList from '../../organisms/CategoryList/CategoryList';
import ProductList from '../../organisms/ProductList/ProductList';
import SizeForm from '../../organisms/SizeForm/SizeForm';
import SizeList from '../../organisms/SizeList/SizeList';


import './AdminTemplate.css';

const AdminTemplate = ({
    categories,
    products,
    sizes,
    onCreateCategory,
    onEditCategory,
    onCreateProduct,
    onEditProduct,
    productToEdit,
    categoryToEdit,
    onCreateSize,
    onEditSize,
    sizeToEdit,
    onEditProductInitiate,
    onEditCategoryInitiate,
    onEditSizeInitiate,
    onDeleteProduct,
    onDeleteCategory,
    onDeleteSize
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

            <div className="category-section">
                <h2>Створити розмір</h2>
                <SizeForm 
                    onSubmit={categoryToEdit ? (data) => onEditSize(sizeToEdit._id, data) : onCreateSize} 
                    sizeToEdit={sizeToEdit}
                />
                <SizeList 
                    sizes={sizes} 
                    onEdit={onEditSizeInitiate} 
                    onDelete={onDeleteSize}
                />
               
            </div>
            
            <div className="product-section">
                <h2>Створити товар</h2>
                <ProductForm
                    categories={categories}
                    productToEdit={productToEdit}
                    onSubmit={productToEdit ? (data) => onEditProduct(productToEdit._id, data) : onCreateProduct}
                />
                <ProductList 
                    products={products} 
                    onEdit={onEditProductInitiate} 
                    onDelete={onDeleteProduct}
                />
            </div>
        </div>
    );
};

export default AdminTemplate;
