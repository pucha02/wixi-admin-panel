import { 
    createCategory, 
    createProduct, 
    createSize,  // Добавляем операцию создания размеров
    updateCategory, 
    updateProduct, 
    updateSize,   // Добавляем операцию обновления размеров
    deleteCategory,  
    deleteProduct, 
    deleteSize    // Добавляем операцию удаления размеров
} from '../services/api';

export const handleDataOperation = async (operation, type, data, id = null, setCategories, setProducts, setSizes, categories, products, sizes, setError) => {
    try {
        let result;

        // Логируем операцию, тип и данные для отладки
        console.log(`Operation: ${operation}, Type: ${type}, Data:`, data, 'ID:', id);

        if (operation === 'create') {
            if (type === 'category') {
                result = await createCategory(data);
            } else if (type === 'product') {
                result = await createProduct(data);
            } else if (type === 'size') {  // Добавляем операцию создания размера
                result = await createSize(data);
            }
        } else if (operation === 'update') {
            if (type === 'category') {
                result = await updateCategory(id, data);
            } else if (type === 'product') {
                result = await updateProduct(id, data);
            } else if (type === 'size') {  // Добавляем операцию обновления размера
                result = await updateSize(id, data);
            }
        } else if (operation === 'delete') {
            if (type === 'category') {
                const response = await deleteCategory(id);
                if (response.status === 200) {
                    console.log('Category deleted');
                }
                setCategories(categories.filter(cat => cat._id !== id));
            } else if (type === 'product') {
                const response = await deleteProduct(id);
                if (response.status === 200) {
                    console.log('Product deleted');
                }
                setProducts(products.filter(prod => prod._id !== id));
            } else if (type === 'size') {  // Добавляем операцию удаления размера
                const response = await deleteSize(id);
                if (response.status === 200) {
                    console.log('Size deleted');
                }
                setSizes(sizes.filter(size => size._id !== id));
            }
            setError(null);  // Успешное удаление, ошибка сбрасывается
            return;  // Завершаем выполнение после удаления
        }

        // Обновляем состояние для категорий
        if (type === 'category') {
            if (operation === 'create') {
                setCategories([...categories, result]);
            } else if (operation === 'update') {
                setCategories(categories.map(cat => (cat._id === id ? result : cat)));
            }
        }

        // Обновляем состояние для продуктов
        else if (type === 'product') {
            if (operation === 'create') {
                setProducts([...products, result]);
            } else if (operation === 'update') {
                setProducts(products.map(prod => (prod._id === id ? result : prod)));
            }
        }

        // Обновляем состояние для размеров
        else if (type === 'size') {  // Обработка состояния для размеров
            if (operation === 'create') {
                setSizes([...sizes, result]);
            } else if (operation === 'update') {
                setSizes(sizes.map(size => (size._id === id ? result : size)));
            }
        }

        setError(null);  // Сброс ошибки при успешной операции

    } catch (err) {
        console.error(`Error during ${operation} ${type}:`, err);  // Логируем ошибку для диагностики
        setError(`Failed to ${operation} ${type}.`);
    }
};
