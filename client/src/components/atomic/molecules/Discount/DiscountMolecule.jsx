// src/components/molecules/DiscountMolecule.js
import React from 'react';
import Input from '../../atoms/FormInput/Input';

const DiscountMolecule = ({ discount, handleDiscountChange }) => (
    <div className="discount-section">
        <Input
            label="Відсоток знижки" 
            type="number" 
            value={discount.percentage} 
            onChange={handleDiscountChange} 
            name="percentage" 
        />
        <Input
            label="Дата початку" 
            type="date" 
            value={discount.startDate} 
            onChange={handleDiscountChange} 
            name="startDate" 
        />
        <Input
            label="Дата кінця" 
            type="date" 
            value={discount.endDate} 
            onChange={handleDiscountChange} 
            name="endDate" 
        />
    </div>
);

export default DiscountMolecule;
