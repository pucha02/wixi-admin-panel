import React, { useState, useEffect } from 'react';
import Input from '../../atoms/FormInput/Input';
import SubmitFormButtonAtom from '../../atoms/FormButtons/SubmitFormButton';
import './SizeForm.css';

const SizeForm = ({ onSubmit, sizeToEdit }) => {
    const [title, setTitle] = useState('');

    // Заполняем поля формы, если переданы данные для редактирования
    useEffect(() => {
        if (sizeToEdit) {
            setTitle(sizeToEdit.title);
        } else {
            setTitle('');
        }
    }, [sizeToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title });
    };

    return (
        <form className="category-form" onSubmit={handleSubmit}>
            <h2>{sizeToEdit ? 'Редагуваті розмір' : 'Створити розмір'}</h2>
            <Input label="Назва розміру" value={title} onChange={(e) => setTitle(e.target.value)} />
            <SubmitFormButtonAtom label={sizeToEdit ? 'Редагувати розмір' : 'Створити розмір'} />
        </form>
    );
};

export default SizeForm;