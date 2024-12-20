import React, { useState, useEffect } from "react";
import Input from "../../atoms/FormInput/Input";
import SizeSelectionMolecule from "../../molecules/SizeSelection/SizeSelectionMolecule";
import ImageInputMolecule from "../../molecules/ImageInput/ImageInputMolecule";
import './ColorInputOrganism.css';

export const ColorInputOrganism = ({
    color,
    colorIndex,
    handleColorChange,
    handleSizeChange,
    addImage,
    handleImageChange,
    sizes
}) => {
    const [selectedSizes, setSelectedSizes] = useState({});

    useEffect(() => {
        if (color.selectedSizes) {
            setSelectedSizes(color.selectedSizes);
        }
    }, [color.selectedSizes]);

    const toggleSizeSelection = (sizeTitle) => {
        const updatedSizes = { ...selectedSizes };
        if (updatedSizes[sizeTitle]) {
            delete updatedSizes[sizeTitle]; // Удаляем размер, если он был выбран повторно
        } else {
            updatedSizes[sizeTitle] = { quantity: 0, sku: '', id: '' }; // Добавляем размер с количеством и пустым артикулом
        }

        setSelectedSizes(updatedSizes);
        handleSizeChange(colorIndex, updatedSizes);
    };

    const updateSizeDetails = (sizeTitle, field, value) => {
        const updatedSizes = {
            ...selectedSizes,
            [sizeTitle]: {
                ...selectedSizes[sizeTitle],
                [field]: value, // Обновляем количество или артикул для выбранного размера
            },
        };

        setSelectedSizes(updatedSizes);
        handleSizeChange(colorIndex, updatedSizes); // Передаем изменения родительскому компоненту
    };

    return (
        <div className="color-input">
            <Input
                label={`Колір ${colorIndex + 1}`}
                name="color_name"
                value={color.color_name}
                onChange={(e) => handleColorChange(colorIndex, e)}
            />
            <h4>Розміри товару</h4>
            <SizeSelectionMolecule
                sizes={sizes}
                selectedSizes={selectedSizes}
                onSizeClick={toggleSizeSelection}
                onQuantityChange={(sizeTitle, quantity) => updateSizeDetails(sizeTitle, 'quantity', quantity)}
                onskuChange={(sizeTitle, sku) => updateSizeDetails(sizeTitle, 'sku', sku)}
            />
            <h4>Зображення товару</h4>
            <ImageInputMolecule
                images={color.img}
                onImageChange={handleImageChange}
                addImage={addImage}
                colorIndex={colorIndex}
            />
        </div>
    );
};
