import React, { useState, useEffect } from 'react';
import Input from '../../atoms/FormInput/Input';
import SubmitFormButtonAtom from '../../atoms/FormButtons/SubmitFormButton';
import './PromocodeForm.css';

const PromocodeForm = ({ onSubmit, promocodeToEdit }) => {
    const [code, setCode] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState()

    useEffect(() => {
        if (promocodeToEdit) {
            console.log('EDIT')
            setCode(promocodeToEdit.code);
            setDiscountPercentage(promocodeToEdit.discountPercentage);
        } else {
            setCode('');
            setDiscountPercentage('');
        }
    }, [promocodeToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ code, discountPercentage });
    };

    return (
        <form className="category-form" onSubmit={handleSubmit}>
            <h2>{promocodeToEdit ? 'Редагувати промокод' : 'Створити промокод'}</h2>
            <Input label="Назва промокоду" value={code} onChange={(e) => setCode(e.target.value)} />
            <Input label="Знижка" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)}/>
            <SubmitFormButtonAtom label={promocodeToEdit ? 'Оновити промокод' : 'Створити промокод'} />
        </form>
    );
};

export default PromocodeForm;