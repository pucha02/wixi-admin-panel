import React from "react";
import SizeOptionAtom from "../../atoms/SizeOption/SizeOptionAtom";
// import './SizeSelectionMolecule.css';

const SizeSelectionMolecule = ({ sizes, selectedSizes, onSizeClick }) => (
    <div className="sizes-list">
        {sizes.map((size) => (
            <SizeOptionAtom 
                key={size._id} 
                sizeTitle={size.title}
                isSelected={selectedSizes.includes(size.title)} 
                onClick={() => onSizeClick(size.title)}
            />
        ))}
    </div>
);

export default SizeSelectionMolecule;
