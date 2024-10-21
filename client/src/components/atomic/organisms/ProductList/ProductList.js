import React from 'react';
import SubmitFormButtonAtom from '../../atoms/FormButtons/SubmitFormButton';
import DeleteElementButtonAtom from '../../atoms/FormButtons/DeleteElementButton';
import './ProductList.css'; // Импорт стилей

const ProductList = ({ products, onEdit, onDelete }) => {
    return (
        <div className="product-list">
            <h2>Список товарів</h2>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.title} - {product.cost}
                        <SubmitFormButtonAtom label="Редагувати" onClick={() => onEdit(product)} />
                        <DeleteElementButtonAtom onClick={() => onDelete(product._id)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
