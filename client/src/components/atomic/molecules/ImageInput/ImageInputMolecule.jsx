// src/components/molecules/ImageInput/ImageInputMolecule.js
import React from "react";
import Input from "../../atoms/FormInput/Input";
import { AddingImageButtonAtom } from "../../atoms/FormButtons/AddingImageButton";

const ImageInputMolecule = ({ images, onImageChange, addImage, colorIndex }) => (
    <div className="image-inputs">
        {images.map((image, imgIndex) => (
            <Input
                key={imgIndex} 
                label={`Посилання зображення ${imgIndex + 1}`} 
                value={image.img_link} 
                onChange={(e) => onImageChange(colorIndex, imgIndex, e)}
            />
        ))}
        <AddingImageButtonAtom type="button" label="Додати зображення" onClick={() => addImage(colorIndex)} />
    </div>
);

export default ImageInputMolecule;
