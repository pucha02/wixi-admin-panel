import React, { useState, useEffect } from 'react';
import Input from '../../atoms/FormInput/Input';
import SubmitFormButtonAtom from '../../atoms/FormButtons/SubmitFormButton';
import './CategoryForm.css';

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
        <form className="category-form" onSubmit={handleSubmit}>
            <h2>{categoryToEdit ? 'Edit Category' : 'Створити категорію'}</h2>
            <Input label="Назва категорії" value={title} onChange={(e) => setTitle(e.target.value)} />
            <SubmitFormButtonAtom label={categoryToEdit ? 'Update Category' : 'Створити категорію'} />
        </form>
    );
};

export default CategoryForm;