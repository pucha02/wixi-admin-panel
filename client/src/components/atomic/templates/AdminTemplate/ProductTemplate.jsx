import React from 'react';
import ProductForm from '../../organisms/ProductForm/ProductForm';
import ProductList from '../../organisms/ProductList/ProductList';

import './AdminTemplate.css';

const ProductTemplate = ({
    sizes,
    categories,
    products,
    onCreateProduct,
    onEditProduct,
    productToEdit,
    onEditProductInitiate,
    onDeleteProduct
}) => {
    return (
        <div className="admin-template">
            <h1>Admin Panel</h1>
            <div className="product-section">
                <h2>Створити товар</h2>
                <ProductForm
                    categories={categories}
                    sizes={sizes}
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

export default ProductTemplate;