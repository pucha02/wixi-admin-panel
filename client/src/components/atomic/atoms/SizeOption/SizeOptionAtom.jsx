import React from "react";
// import './SizeOptionAtom.css';

const SizeOptionAtom = ({
    sizeTitle,
    isSelected,
    quantity,
    sku,
    onClick,
    onQuantityChange,
    onskuChange,
    id
}) => (
    <div className={`size-option ${isSelected ? "selected" : ""}`}>
        <button type="button" onClick={onClick}>
            {sizeTitle}
        </button>
        {isSelected && (
            <div className="size-details">
                <label>
                    Кількість:
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => onQuantityChange(parseInt(e.target.value, 10) || 0)}
                        min="0"
                    />
                </label>
                <label>
                    Артикул:
                    <input
                        type="text"
                        value={sku}
                        onChange={(e) => onskuChange(e.target.value)}
                    />
                </label>
                <label>
                    ID:
                    <input
                        type="number"
                        value={id}
                        // onChange={(e) => onskuChange(e.target.value)}
                    />
                </label>
            </div>
        )}
    </div>
);

export default SizeOptionAtom;
