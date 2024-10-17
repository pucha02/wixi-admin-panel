import React, { useState, useEffect } from 'react';
import AdminTemplate from '../templates/AdminTemplate';
import { fetchCategories, fetchProducts, createCategory, createProduct, updateCategory, updateProduct } from '../../../services/api';

const AdminPage = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productToEdit, setProductToEdit] = useState(null);
    const [categoryToEdit, setCategoryToEdit] = useState(null); // Состояние для редактируемой категории

    useEffect(() => {
        const loadData = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                const fetchedProducts = await fetchProducts();
                setCategories(fetchedCategories);
                setProducts(fetchedProducts);
            } catch (err) {
                setError('Failed to load data.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleCreateCategory = async (data) => {
        try {
            const newCategory = await createCategory(data);
            setCategories([...categories, newCategory]);
            setCategoryToEdit(null); // Сбросить редактируемую категорию после создания
        } catch (err) {
            setError('Failed to create category.');
        }
    };

    const handleEditCategory = async (id, updatedData) => {
        try {
            const updatedCategory = await updateCategory(id, updatedData);
            setCategories(categories.map(cat => (cat._id === id ? updatedCategory : cat)));
            setCategoryToEdit(null); // Сбросить редактируемую категорию после обновления
        } catch (err) {
            setError('Failed to update category.');
        }
    };

    const handleCreateProduct = async (data) => {
        try {
            const newProduct = await createProduct(data);
            setProducts([...products, newProduct]);
            setProductToEdit(null); // Сбросить редактируемый продукт после создания
        } catch (err) {
            setError('Failed to create product.');
        }
    };

    const handleEditProduct = async (id, updatedData) => {
        try {
            const updatedProduct = await updateProduct(id, updatedData);
            setProducts(products.map(prod => (prod._id === id ? updatedProduct : prod)));
            setProductToEdit(null); // Сбросить редактируемый продукт после обновления
        } catch (err) {
            setError('Failed to update product.');
        }
    };

    const handleEditCategoryInitiate = (category) => {
        setCategoryToEdit(category);
    };

    // Обработчик для редактирования продукта
    const handleEditProductInitiate = (product) => {
        setProductToEdit(product);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <AdminTemplate
            categories={categories}
            products={products}
            onCreateCategory={handleCreateCategory}
            onEditCategory={handleEditCategory}
            onCreateProduct={handleCreateProduct}
            onEditProduct={handleEditProduct}
            productToEdit={productToEdit}
            categoryToEdit={categoryToEdit} // Передаем редактируемую категорию
            onEditProductInitiate={handleEditProductInitiate}
            onEditCategoryInitiate={handleEditCategoryInitiate} // Передаем функцию для инициации редактирования категории
        />
    );
};

export default AdminPage;
