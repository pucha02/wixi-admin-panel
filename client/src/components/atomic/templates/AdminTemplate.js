import React from 'react';
import CategoryForm from '../molecules/CategoryForm';
import ProductForm from '../molecules/ProductForm';
import CategoryList from '../organisms/CategoryList';
import ProductList from '../organisms/ProductList';

const AdminTemplate = ({
    categories,
    products,
    onCreateCategory,
    onEditCategory,
    onCreateProduct,
    onEditProduct,
    productToEdit,
    categoryToEdit,
    onEditProductInitiate,
    onEditCategoryInitiate,
}) => {
    return (
        <div>
            <h1>Admin Panel</h1>
            <div>
                <h2>Create Category</h2>
                <CategoryForm 
                    onSubmit={categoryToEdit ? (data) => onEditCategory(categoryToEdit._id, data) : onCreateCategory} 
                    categoryToEdit={categoryToEdit}
                />
                <CategoryList categories={categories} onEdit={onEditCategoryInitiate} />
            </div>
            <div>
                <h2>Create Product</h2>
                <ProductForm
                    categories={categories}
                    productToEdit={productToEdit}
                    onSubmit={productToEdit ? (data) => onEditProduct(productToEdit._id, data) : onCreateProduct}
                />
                <ProductList products={products} onEdit={onEditProductInitiate} />
            </div>
        </div>
    );
};

export default AdminTemplate;
