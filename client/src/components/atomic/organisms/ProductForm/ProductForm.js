import React, { useState, useEffect } from 'react';
import Input from '../../atoms/FormInput/Input';
import SelectCategoryAtom from '../../atoms/SelectCategory/SelectCategoryAtom';
import SubmitFormButtonAtom from '../../atoms/FormButtons/SubmitFormButton';
import { AddingColorButtonAtom } from '../../atoms/FormButtons/AddingColorButton';
import DiscountMolecule from '../../molecules/Discount/DiscountMolecule';
import { ColorInputOrganism } from '../ColorInput/ColorInputOrganism';
import './ProductForm.css';

const ProductForm = ({ sizes, categories, productToEdit, onSubmit, products }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [discount, setDiscount] = useState({ percentage: 0, startDate: '', endDate: '' });
    const [colors, setColors] = useState([{ color_name: '', sizes: [], img: [] }]);
    const [relatedProducts, setRelatedProducts] = useState([]); // Поле для выбора связанных товаров
    useEffect(() => {
        console.log('Выбранные связанные товары:', relatedProducts);
    }, [relatedProducts]);

    useEffect(() => {
        if (productToEdit) {
            setTitle(productToEdit.title);
            setCategory(productToEdit.category);
            setType(productToEdit.type || '');
            setDescription(productToEdit.description || '');
            setCost(productToEdit.cost || '');
            setDiscount(productToEdit.discount || { percentage: 0, startDate: '', endDate: '' });
            const colorsWithSelectedSizes = productToEdit.color.map((color) => ({
                ...color,
                selectedSizes: Object.fromEntries(
                    color.sizes.map((size) => [
                        size.size_name,
                        { quantity: size.availableQuantity || 0, sku: size.sku || '', id: size.id || '' },
                    ])
                ),
            }));
            setColors(colorsWithSelectedSizes);
            setRelatedProducts(productToEdit.relatedProducts || []); // Загрузить связанные товары
        }
    }, [productToEdit]);

    const handleChange = (setter) => (e) => setter(e.target.value);
    const handleDiscountChange = (e) => {
        const { name, value } = e.target;
        setDiscount((prev) => ({ ...prev, [name]: value }));
    };

    const handleColorChange = (index, e) => {
        const { name, value } = e.target;
        const newColors = [...colors];
        newColors[index][name] = value;
        setColors(newColors);
    };

    const handleSizeChange = (colorIndex, updatedSizes) => {
        const newColors = [...colors];
        newColors[colorIndex].sizes = Object.entries(updatedSizes).map(([size, { quantity, sku, id }]) => ({
            size_name: size,
            availableQuantity: quantity,
            sku: sku,
            id: id || '', // Сохраняем существующий `id`
        }));
        setColors(newColors);
    };
    

    const handleImageChange = (colorIndex, imgIndex, e) => {
        const { value } = e.target;
        const newColors = [...colors];
        if (!Array.isArray(newColors[colorIndex].img)) {
            newColors[colorIndex].img = [];
        }
        newColors[colorIndex].img[imgIndex] = { img_link: value };
        setColors(newColors);
    };

    const addColor = () => {
        setColors([...colors, { color_name: '', sizes: [], img: [] }]);
    };

    const addImage = (colorIndex) => {
        const newColors = [...colors];
        if (!Array.isArray(newColors[colorIndex].img)) {
            newColors[colorIndex].img = [];
        }
        newColors[colorIndex].img.push({ img_link: '' });
        setColors(newColors);
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            title,
            category,
            type,
            description,
            cost,
            discount,
            color: colors,
            relatedProducts,
        };
        onSubmit(productData); // Передача данных в родительский компонент

        alert(productToEdit ? 'Товар успішно відредаговано!' : 'Товар успішно створено!');
        window.location.reload(); // Перезагрузка страницы
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <Input label="Назва товару" value={title} onChange={handleChange(setTitle)} required />
            <SelectCategoryAtom label="Категорія" value={category} options={categories} onChange={handleChange(setCategory)} required />
            <Input label="Тип товару" value={type} onChange={handleChange(setType)} />
            <Input label="Опис товару" value={description} onChange={handleChange(setDescription)} />
            <Input label="Ціна" type="number" value={cost} onChange={handleChange(setCost)} required />
            <DiscountMolecule discount={discount} handleDiscountChange={handleDiscountChange} />

            {colors.map((color, index) => (
                <ColorInputOrganism
                    key={index}
                    color={color}
                    colorIndex={index}
                    handleColorChange={handleColorChange}
                    handleSizeChange={handleSizeChange}
                    handleImageChange={handleImageChange}
                    addImage={addImage}
                    sizes={sizes}
                />
            ))}

            <AddingColorButtonAtom label="Додати колір" onClick={addColor} />

            <div className="related-products">
                <label>Пов'язані товари</label>
                <Input
                    label="Поиск товаров"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="related-products-checkboxes">
                    {filteredProducts.map((product) => (
                        <div key={product._id} className="checkbox-item">
                            <input
                                type="checkbox"
                                id={`related-product-${product._id}`}
                                value={product._id}
                                checked={relatedProducts.includes(product._id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setRelatedProducts([...relatedProducts, product._id]);
                                    } else {
                                        setRelatedProducts(relatedProducts.filter((id) => id !== product._id));
                                    }
                                }}
                            />
                            <label htmlFor={`related-product-${product._id}`}>{product.title}</label>
                        </div>
                    ))}
                </div>
            </div>




            <SubmitFormButtonAtom label={productToEdit ? 'Редагувати товар' : 'Створити товар'} type="submit" />
        </form>
    );
};

export default ProductForm;
