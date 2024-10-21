const API_URL = 'http://localhost:5001/api';

// Получение категорий
export const fetchCategories = async () => {
    const res = await fetch(`${API_URL}/categories`);
    return res.json();
};

// Получение товаров
export const fetchProducts = async () => {
    const res = await fetch(`${API_URL}/products`);
    return res.json();
};

// Получение размеров
export const fetchSizes = async () => {
    const res = await fetch(`${API_URL}/sizes`);
    return res.json();
};

// Создание категории
export const createCategory = async (category) => {
    const res = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
    });
    return res.json();
};

// Создание товара
export const createProduct = async (product) => {
    const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    console.log(product);
    return res.json();
};

// Создание размера
export const createSize = async (size) => {
    const res = await fetch(`${API_URL}/sizes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(size),
    });
    return res.json();
};

// Обновление категории
export const updateCategory = async (id, updatedData) => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });
    return response.json();
};

// Обновление товара
export const updateProduct = async (id, updatedData) => {
    console.log(updatedData);
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });
    return response.json();
};

// Обновление размера
export const updateSize = async (id, updatedData) => {
    const response = await fetch(`${API_URL}/sizes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });
    return response.json();
};

// Удаление категории
export const deleteCategory = async (id) => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
};

// Удаление товара
export const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
};

// Удаление размера
export const deleteSize = async (id) => {
    const response = await fetch(`${API_URL}/sizes/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
};
