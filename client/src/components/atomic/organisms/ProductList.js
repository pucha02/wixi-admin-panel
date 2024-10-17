import React from 'react';
import Button from '../atoms/Button';

const ProductList = ({ products, onEdit }) => {
    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.title} - {product.cost}
                        <Button label="Edit" onClick={() => onEdit(product)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
