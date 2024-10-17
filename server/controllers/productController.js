import Product from '../models/Product.js';

// Создание товара
export const createProduct = async (req, res) => {
    console.log(req.body)
    try {
        const product = new Product(req.body);
        console.log(product)
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Получение всех товаров
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Обновление товара
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Удаление товара
export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Товар удален' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
