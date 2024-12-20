import React from "react";
import SizeOptionAtom from "../../atoms/SizeOption/SizeOptionAtom";
// import './SizeSelectionMolecule.css';

const SizeSelectionMolecule = ({
    sizes,
    selectedSizes,
    onSizeClick,
    onQuantityChange,
    onskuChange,
}) => (
    <div className="sizes-list">
        {console.log(selectedSizes)}
        {sizes.map((size) => (
            <SizeOptionAtom
                key={size._id}
                sizeTitle={size.title}
                isSelected={selectedSizes.hasOwnProperty(size.title)} // Проверяем, выбран ли размер
                quantity={selectedSizes[size.title]?.quantity || 0} // Получаем количество для выбранного размера
                sku={selectedSizes[size.title]?.sku || ''} // Получаем артикул для выбранного размера
                onClick={() => onSizeClick(size.title)}
                onQuantityChange={(quantity) => onQuantityChange(size.title, quantity)}
                onskuChange={(sku) => onskuChange(size.title, sku)}
                id={selectedSizes[size.title]?.id || ''}
            />
        ))}
    </div>
);

export default SizeSelectionMolecule;
