import React, { useState, useEffect } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const ProductForm = ({ categories, productToEdit, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [discount, setDiscount] = useState({ percentage: 0, startDate: '', endDate: '' });
    const [colors, setColors] = useState([{ color_name: '', sizes: [{ size_name: '' }], img: [{ img_link: '' }] }]);

    // Заполняем поля формы, если переданы данные для редактирования
    useEffect(() => {
        if (productToEdit) {
            setTitle(productToEdit.title);
            setCategory(productToEdit.category._id);
            setType(productToEdit.type || '');
            setDescription(productToEdit.description || '');
            setCost(productToEdit.cost || '');
            setDiscount(productToEdit.discount || { percentage: 0, startDate: '', endDate: '' });
            setColors(productToEdit.color || [{ color_name: '', sizes: [{ size_name: '' }], img: [{ img_link: '' }] }]);
            console.log(productToEdit)
        }
    }, [productToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !category || !cost) {
            alert("Please fill in all required fields.");
            return;
        }
        
        const productData = {
            title,
            category,
            type,
            description,
            cost,
            discount,
            color: colors
        };
        onSubmit(productData);
    };

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleDiscountChange = (e) => {
        const { name, value } = e.target;
        setDiscount((prevDiscount) => ({ ...prevDiscount, [name]: value }));
    };

    const handleColorChange = (index, e) => {
        const { name, value } = e.target;
        const newColors = [...colors];
        newColors[index] = { ...newColors[index], [name]: value };
        setColors(newColors);
    };

    const handleSizeChange = (colorIndex, sizeIndex, e) => {
        const { value } = e.target;
        const newColors = [...colors];
        newColors[colorIndex].sizes[sizeIndex] = { size_name: value };
        setColors(newColors);
    };

    const handleImageChange = (colorIndex, imgIndex, e) => {
        const { value } = e.target;
        const newColors = [...colors];
        newColors[colorIndex].img[imgIndex] = { img_link: value };
        setColors(newColors);
    };

    const addColor = () => {
        setColors([...colors, { color_name: '', sizes: [{ size_name: '' }], img: [{ img_link: '' }] }]);
    };

    const addSize = (colorIndex) => {
        const newColors = [...colors];
        newColors[colorIndex].sizes.push({ size_name: '' });
        setColors(newColors);
    };

    const addImage = (colorIndex) => {
        const newColors = [...colors];
        newColors[colorIndex].img.push({ img_link: '' });
        setColors(newColors);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input label="Title" value={title} onChange={handleChange(setTitle)} required />
            
            <label>Category</label>
            <select value={category} onChange={handleChange(setCategory)} required>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                        {cat.title}
                    </option>
                ))}
            </select>

            <Input label="Type" value={type} onChange={handleChange(setType)} />
            <Input label="Description" value={description} onChange={handleChange(setDescription)} />
            <Input label="Cost" type="number" value={cost} onChange={handleChange(setCost)} required />

            <label>Discount Percentage</label>
            <Input
                type="number"
                name="percentage"
                value={discount.percentage}
                onChange={handleDiscountChange}
            />
            <label>Discount Start Date</label>
            <Input
                type="date"
                name="startDate"
                value={discount.startDate}
                onChange={handleDiscountChange}
            />
            <label>Discount End Date</label>
            <Input
                type="date"
                name="endDate"
                value={discount.endDate}
                onChange={handleDiscountChange}
            />

            {colors.map((color, colorIndex) => (
                <div key={colorIndex}>
                    <Input
                        label={`Color Name ${colorIndex + 1}`}
                        name="color_name"
                        value={color.color_name}
                        onChange={(e) => handleColorChange(colorIndex, e)}
                    />
                    <h4>Sizes</h4>
                    {color.sizes.map((size, sizeIndex) => (
                        <Input
                            key={sizeIndex}
                            label={`Size ${sizeIndex + 1}`}
                            value={size.size_name}
                            onChange={(e) => handleSizeChange(colorIndex, sizeIndex, e)}
                        />
                    ))}
                    <Button type="button" label="Add Size" onClick={() => addSize(colorIndex)} />
                    <h4>Images</h4>
                    {color.img.map((image, imgIndex) => (
                        <Input
                            key={imgIndex}
                            label={`Image URL ${imgIndex + 1}`}
                            value={image.img_link}
                            onChange={(e) => handleImageChange(colorIndex, imgIndex, e)}
                        />
                    ))}
                    <Button type="button" label="Add Image" onClick={() => addImage(colorIndex)} />
                </div>
            ))}
            <Button type="button" label="Add Color" onClick={addColor} />

            <Button label={productToEdit ? 'Update Product' : 'Create Product'} />
        </form>
    );
};

export default ProductForm;
