import React, { useState, useEffect } from 'react';
import Input from '../../atoms/FormInput/Input';
import SelectCategoryAtom from '../../atoms/SelectCategory/SelectCategoryAtom';
import SubmitFormButtonAtom from '../../atoms/FormButtons/SubmitFormButton';
import { AddingColorButtonAtom } from '../../atoms/FormButtons/AddingColorButton';
import DiscountMolecule from '../../molecules/Discount/DiscountMolecule';
import { ColorInputOrganism } from '../ColorInput/ColorInputOrganism';
import './ProductForm.css';

const ProductForm = ({ sizes, categories, productToEdit, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [discount, setDiscount] = useState({ percentage: 0, startDate: '', endDate: '' });
    const [colors, setColors] = useState([{ color_name: '', sizes: [], img: [] }]);

    useEffect(() => {
        if (productToEdit) {
            setTitle(productToEdit.title);
            setCategory(productToEdit.category._id);
            setType(productToEdit.type || '');
            setDescription(productToEdit.description || '');
            setCost(productToEdit.cost || '');
            setDiscount(productToEdit.discount || { percentage: 0, startDate: '', endDate: '' });
            const colorsWithSelectedSizes = productToEdit.color.map((color) => ({
                ...color,
                selectedSizes: color.sizes.map(size => size.size_name),
            }));
            setColors(colorsWithSelectedSizes);
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

    const handleSizeChange = (colorIndex, selectedSizes) => {
        const newColors = [...colors];
        newColors[colorIndex].sizes = selectedSizes.map((size) => ({ size_name: size }));
        setColors(newColors);
    };

    const handleImageChange = (colorIndex, imgIndex, e) => {
        const { value } = e.target;
        const newColors = [...colors];
        newColors[colorIndex].img[imgIndex] = { img_link: value };
        setColors(newColors);
    };

    const addColor = () => {
        setColors([...colors, { color_name: '', sizes: [], img: [] }]);
    };

    const addImage = (colorIndex) => {
        const newColors = [...colors];
        newColors[colorIndex].img.push({ img_link: '' });
        setColors(newColors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = { title, category, type, description, cost, discount, color: colors };
        onSubmit(productData);
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

            <SubmitFormButtonAtom label={productToEdit ? 'Редагувати товар' : 'Створити товар'} type="submit" />
        </form>
    );
};

export default ProductForm;