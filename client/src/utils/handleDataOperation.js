import { 
    createCategory, 
    createProduct, 
    createSize, 
    createData,
    updateCategory, 
    updateProduct, 
    updateSize, 
    updateData, 
    deleteCategory,  
    deleteProduct, 
    deleteSize,
    deleteData
} from '../services/api';

export const handleDataOperation = async (operation, type, data, id = null, setCategories, setProducts, setSizes, setPromocodes, categories, products, sizes, promocodes, setError) => {
    try {
        let result;

        // Логируем операцию, тип и данные для отладки
        console.log(`Operation: ${operation}, Type: ${type}, Data:`, data, 'ID:', id);

        if (operation === 'create') {
            if (type === 'category') {
                result = await createData(data, '/categories');
            } else if (type === 'product') {
                result = await createData(data, '/products');
            } else if (type === 'size') {  // Добавляем операцию создания размера
                result = await createData(data, '/sizes');
            } else if (type === 'promocode') {  // Добавляем операцию создания размера
                result = await createData(data, 'promocodes');
            }
        } else if (operation === 'update') {
            if (type === 'category') {
                result = await updateData(id, data, '/categories');
            } else if (type === 'product') {
                result = await updateData(id, data, '/products');
            } else if (type === 'size') {  // Добавляем операцию обновления размера
                result = await updateData(id, data, '/sizes');
            } else if (type === 'promocode') {  // Добавляем операцию обновления размера
                result = await updateData(id, data, 'promocodes');
            }
        } else if (operation === 'delete') {
            if (type === 'category') {
                const response = await deleteData(id, '/categories');
                if (response.status === 200) {
                    console.log('Category deleted');
                }
                setCategories(categories.filter(cat => cat._id !== id));
            } else if (type === 'product') {
                const response = await deleteData(id, '/products');
                if (response.status === 200) {
                    console.log('Product deleted');
                }
                setProducts(products.filter(prod => prod._id !== id));
            } else if (type === 'size') {  // Добавляем операцию удаления размера
                const response = await deleteData(id, '/sizes');
                if (response.status === 200) {
                    console.log('Size deleted');
                }
                setSizes(sizes.filter(size => size._id !== id));
            } else if (type === 'promocode') {  // Добавляем операцию удаления размера
                const response = await deleteData(id, 'promocodes');
                if (response.status === 200) {
                    console.log('promocode deleted');
                }
                setPromocodes(promocodes.filter(size => size._id !== id));
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

        else if (type === 'promocode') {  // Обработка состояния для размеров
            if (operation === 'create') {
                setPromocodes([...promocodes, result]);
            } else if (operation === 'update') {
                setPromocodes(promocodes.map(size => (size._id === id ? result : size)));
            }
        }

        setError(null);  // Сброс ошибки при успешной операции

    } catch (err) {
        console.error(`Error during ${operation} ${type}:`, err);  // Логируем ошибку для диагностики
        setError(`Failed to ${operation} ${type}.`);
    }
};
