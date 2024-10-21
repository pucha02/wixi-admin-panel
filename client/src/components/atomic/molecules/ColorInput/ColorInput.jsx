import React, { useState, useEffect } from "react";
import Input from "../../atoms/FormInput/Input";
import { AddingImageButtonAtom } from "../../atoms/FormButtons/AddingImageButton";
import './ColorInput.css'; // Подключаем стили

export const ColorInput = ({ color, colorIndex, handleColorChange, handleSizeChange, addImage, handleImageChange, sizes }) => {
    const [selectedSizes, setSelectedSizes] = useState([]);

    // Инициализируем выбранные размеры при изменении пропсов
    useEffect(() => {
        if (color.selectedSizes) {
            setSelectedSizes(color.selectedSizes);
        }
    }, [color.selectedSizes]);

    // Функция для обработки выбора размеров
    const toggleSizeSelection = (sizeTitle) => {
        const updatedSizes = selectedSizes.includes(sizeTitle)
            ? selectedSizes.filter((size) => size !== sizeTitle)
            : [...selectedSizes, sizeTitle];

        setSelectedSizes(updatedSizes);
        handleSizeChange(colorIndex, updatedSizes); // Передаем изменения в родительский компонент
    };

    return (
        <div>
            <Input
                label={`Колір ${colorIndex + 1}`}
                name="color_name"
                value={color.color_name}
                onChange={(e) => handleColorChange(colorIndex, e)}
            />
            <h4>Розміри товару</h4>

            {/* Рендерим список размеров */}
            <div className="sizes-list">
                {sizes.map((size) => (
                    <div
                        key={size._id} // Используем уникальный _id
                        className={`size-option ${selectedSizes.includes(size.title) ? "selected" : ""}`}
                        onClick={() => toggleSizeSelection(size.title)}
                    >
                        {size.title} {/* Отображаем название размера */}
                    </div>
                ))}
            </div>

            <h4>Зображення товару</h4>
            {color.img.map((image, imgIndex) => (
                <Input
                    key={imgIndex}
                    label={`Посилання зображення ${imgIndex + 1}`}
                    value={image.img_link}
                    onChange={(e) => handleImageChange(colorIndex, imgIndex, e)}
                />
            ))}
            <AddingImageButtonAtom type="button" label="Додати зображення" onClick={() => addImage(colorIndex)} />
        </div>
    );
};
