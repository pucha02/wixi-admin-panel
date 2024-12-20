import React, { useState } from 'react';
import SubmitFormButtonAtom from '../../atoms/FormButtons/SubmitFormButton';
import DeleteElementButtonAtom from '../../atoms/FormButtons/DeleteElementButton';
import Input from '../../atoms/FormInput/Input';
import './ProductList.css'; // Импорт стилей

const ProductList = ({ products, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Фильтрация товаров по названию
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Группировка товаров по категориям
    const groupedProducts = filteredProducts.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    const handleEdit = (product) => {
        onEdit(product); // Вызов функции редактирования
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Плавная прокрутка
        });
    };

    return (
        <div className="product-list">
            <h2>Список товарів</h2>
            <Input
                label="Пошук товарів"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Введіть назву товару"
            />
            {Object.keys(groupedProducts).map((category) => (
                <div key={category} className="category-group">
                    <h3>{category}</h3>
                    <ul>
                        {groupedProducts[category].map((product) => (
                            <li key={product._id}>
                                <span>{product.title} - {product.cost}</span>
                                <SubmitFormButtonAtom
                                    label="Редагувати"
                                    onClick={() => handleEdit(product)}
                                />
                                <DeleteElementButtonAtom
                                    onClick={() => onDelete(product._id)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
