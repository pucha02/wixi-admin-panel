// src/components/organisms/ColorInput/ColorInputOrganism.js
import React, { useState, useEffect } from "react";
import Input from "../../atoms/FormInput/Input";
import SizeSelectionMolecule from "../../molecules/SizeSelection/SizeSelectionMolecule";
import ImageInputMolecule from "../../molecules/ImageInput/ImageInputMolecule";
import './ColorInputOrganism.css';

export const ColorInputOrganism = ({ color, colorIndex, handleColorChange, handleSizeChange, addImage, handleImageChange, sizes }) => {
    const [selectedSizes, setSelectedSizes] = useState([]);

    useEffect(() => {
        if (color.selectedSizes) {
            setSelectedSizes(color.selectedSizes);
        }
    }, [color.selectedSizes]);

    const toggleSizeSelection = (sizeTitle) => {
        const updatedSizes = selectedSizes.includes(sizeTitle)
            ? selectedSizes.filter((size) => size !== sizeTitle)
            : [...selectedSizes, sizeTitle];

        setSelectedSizes(updatedSizes);
        handleSizeChange(colorIndex, updatedSizes);
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
