import React from 'react';

const SelectCategoryAtom = ({ label, value, options, onChange, required = false }) => (
    <div className="select-field">
        <label>{label}</label>
        <select value={value} onChange={onChange} required={required}>
            <option value="">Оберіть категорію</option>
            {options.map(option => (
                <option key={option._id} value={option.title}>
                    {option.title}
                </option>
            ))}
        </select>
    </div>
);

export default SelectCategoryAtom;
