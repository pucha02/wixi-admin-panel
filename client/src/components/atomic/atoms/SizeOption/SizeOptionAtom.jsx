import React from "react";
// import './SizeOptionAtom.css';

const SizeOptionAtom = ({ sizeTitle, isSelected, onClick }) => (
    <div className={`size-option ${isSelected ? "selected" : ""}`} onClick={onClick}>
        {sizeTitle}
    </div>
);

export default SizeOptionAtom;
