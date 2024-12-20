import React, { useState, useEffect } from 'react';
import CategoryTemplate from '../templates/AdminTemplate/CategoryTemplate';
import ProductTemplate from '../templates/AdminTemplate/ProductTemplate';
import SizeTemplate from '../templates/AdminTemplate/SizeTemplate';
import PromocodeTemplate from '../templates/AdminTemplate/PromocodeTemplate';
import { handleDataOperation } from '../../../utils/handleDataOperation';
import { fetchCategories, fetchProducts, fetchSizes, fetchData } from '../../../services/api';
import './AdminPage.css'; // Импортируем стили

const AdminPage = () => {
    const [categories, setCategories] = useState([]);
    const [promocodes, setPromocodes] = useState([]);
    const [products, setProducts] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productToEdit, setProductToEdit] = useState(null);
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [promocodeToEdit, setPromocodeToEdit] = useState(null);
    const [sizeToEdit, setSizeToEdit] = useState(null);

    const [activeTab, setActiveTab] = useState('categories'); // Состояние для активного таба

    useEffect(() => {
        const loadData = async () => {
            try {
                const fetchedCategories = await fetchData('/categories');
                const fetchedProducts = await fetchData('/products');
                const fetchedSizes = await fetchData('/sizes');
                const fetchedPromocodes = await fetchData('/promocodes');
                setCategories(fetchedCategories);
                setProducts(fetchedProducts);
                setSizes(fetchedSizes);
                setPromocodes(fetchedPromocodes)
            } catch (err) {
                setError('Failed to load data.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleCreatePromocode = (data) => handleDataOperation('create', 'promocode', data, null, setCategories, setProducts, setSizes, setPromocodes, categories, products, sizes, promocodes, setError);
    const handleEditPromocode = (id, updatedData) => handleDataOperation('update', 'promocode', updatedData, id, setCategories, setProducts, setSizes, setPromocodes, categories, products, sizes, promocodes, setError);
    const handleDeletePromocode = (id) => handleDataOperation('delete', 'promocode', null, id, setCategories, setProducts, setSizes, setPromocodes, categories, products, sizes, promocodes, setError);

    const handleCreateCategory = (data) => handleDataOperation('create', 'category', data, null, setCategories, setProducts, setSizes, setPromocodes, categories, products, sizes, promocodes, setError);
    const handleEditCategory = (id, updatedData) => handleDataOperation('update', 'category', updatedData, id, setCategories, setProducts, setSizes, setPromocodes, categories, products, sizes, promocodes, setError);
    const handleDeleteCategory = (id) => handleDataOperation('delete', 'category', null, id, setCategories, setProducts, setSizes, setPromocodes, categories, products, sizes, promocodes, setError);

    const handleCreateSize = (data) => handleDataOperation('create', 'size', data, null, setCategories, setProducts, setSizes, setPromocodes, categories, products, sizes, promocodes, setError);
    const handleEditSize = (id, updatedData) => handleDataOperation('update', 'size', updatedData, id, setCategories, setProducts, setSizes, setPromocodes, categories, products, sizes, promocodes, setError);
    const handleDeleteSize = (id) => handleDataOperation('delete', 'size', null, id, setCategories, setProducts, setSizes, setPromocodes, categories, products, sizes, promocodes, setError);

    const handleCreateProduct = (data) => handleDataOperation('create', 'product', data, null, setCategories, setProducts, setSizes, setPromocodes, categories, products, sizes, promocodes, setError);
    const handleEditProduct = (id, updatedData) => handleDataOperation('update', 'product', updatedData, id, setCategories, setProducts, setSizes, setPromocodes, categories, products, sizes, promocodes, setError);
    const handleDeleteProduct = (id) => handleDataOperation('delete', 'product', null, id, setCategories, setProducts, setSizes, setPromocodes, categories, products, sizes, promocodes, setError);

    const handleEditCategoryInitiate = (category) => {
        setCategoryToEdit(category);

    };

    const handleEditPromocodeInitiate = (category) => {
        setPromocodeToEdit(category);

    };

    const handleEditProductInitiate = (product) => {
        setProductToEdit(product);
    };

    const handleEditSizeInitiate = (size) => {
        setSizeToEdit(size);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="admin-page">
            <div className="sidebar">
                <ul className="tab-list">
                    <li
                        className={activeTab === 'categories' ? 'active' : ''}
                        onClick={() => setActiveTab('categories')}
                    >
                        Категорії
                    </li>
                    <li
                        className={activeTab === 'promocodes' ? 'active' : ''}
                        onClick={() => setActiveTab('promocodes')}
                    >
                        Промокоди
                    </li>
                    <li
                        className={activeTab === 'products' ? 'active' : ''}
                        onClick={() => setActiveTab('products')}
                    >
                        Товари
                    </li>
                    <li
                        className={activeTab === 'sizes' ? 'active' : ''}
                        onClick={() => setActiveTab('sizes')}
                    >
                        Розміри
                    </li>
                </ul>
            </div>
            <div className="content">
                {activeTab === 'categories' && (
                    <CategoryTemplate
                        categories={categories}
                        onCreateCategory={handleCreateCategory}
                        onEditCategory={handleEditCategory}
                        onDeleteCategory={handleDeleteCategory}
                        onEditCategoryInitiate={handleEditCategoryInitiate}
                        categoryToEdit={categoryToEdit}
                    />
                )}
                {activeTab === 'promocodes' && (
                    <PromocodeTemplate
                        promocodes={promocodes}
                        onCreatePromocode={handleCreatePromocode}
                        onEditPromocode={handleEditPromocode}
                        onDeletePromocode={handleDeletePromocode}
                        onEditPromocodeInitiate={handleEditPromocodeInitiate}
                        promocodeToEdit={promocodeToEdit}
                    />
                )}
                {activeTab === 'products' && (
                    <ProductTemplate
                        sizes={sizes}
                        categories={categories}
                        products={products}
                        onCreateProduct={handleCreateProduct}
                        onEditProduct={handleEditProduct}
                        onDeleteProduct={handleDeleteProduct}
                        productToEdit={productToEdit}
                        onEditProductInitiate={handleEditProductInitiate}
                    />
                )}
                {activeTab === 'sizes' && (
                    <SizeTemplate
                        sizes={sizes}
                        onCreateSize={handleCreateSize}
                        onEditSize={handleEditSize}
                        onDeleteSize={handleDeleteSize}
                        sizeToEdit={sizeToEdit}
                        onEditSizeInitiate={handleEditSizeInitiate}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminPage;