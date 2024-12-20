import React from 'react';
import PromocodeForm from '../../organisms/PromocodeForm/PromocodeForm';
import PromocodeList from '../../organisms/PromocodeList/PromocodeList';

import './AdminTemplate.css';

const PromocodeTemplate = ({
    promocodes,
    onCreatePromocode,
    onEditPromocode,
    promocodeToEdit,
    onEditPromocodeInitiate,
    onDeletePromocode,
}) => {
    return (
        <div className="admin-template">
            <h1>Admin Panel</h1>
            
            <div className="category-section">
                <h2>Створити категорію</h2>
                <PromocodeForm 
                    onSubmit={promocodeToEdit ? (data) => onEditPromocode(promocodeToEdit._id, data) : onCreatePromocode} 
                    categoryToEdit={promocodeToEdit}
                />
                
                <PromocodeList 
                    promocodes={promocodes} 
                    onEdit={onEditPromocodeInitiate} 
                    onDelete={onDeletePromocode}
                />
            </div>          
        </div>
    );
};

export default PromocodeTemplate;