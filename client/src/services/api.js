const API_URL = 'http://localhost:5001/api';



export const fetchData = async (way) => {
    const res = await fetch(`${API_URL}/${way}`);
    return res.json();
};

export const createData = async (data, way) => {
    const res = await fetch(`${API_URL}/${way}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
};


export const updateData = async (id, updatedData, way) => {
    const response = await fetch(`${API_URL}/${way}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });
    return response.json();
};

// Удаление категории
export const deleteCategory = async (id) => {
    console.log(id)
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

export const deleteData = async (id, way) => {
    const response = await fetch(`${API_URL}/${way}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
};
