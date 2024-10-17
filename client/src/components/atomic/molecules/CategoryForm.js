import React, { useState, useEffect } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const CategoryForm = ({ onSubmit, categoryToEdit }) => {
    const [title, setTitle] = useState('');

    // Заполняем поля формы, если переданы данные для редактирования
    useEffect(() => {
        if (categoryToEdit) {
            setTitle(categoryToEdit.title);
        } else {
            setTitle('');
        }
    }, [categoryToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input label="Category Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Button label={categoryToEdit ? 'Update Category' : 'Create Category'} />
        </form>
    );
};

export default CategoryForm;
