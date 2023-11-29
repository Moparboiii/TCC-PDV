import React from "react";

const ProductsModal = ({ className, children }) => {

    return (
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 flex justify-center items-center backdrop-blur-xl ${className}`}>
            <div className="flex flex-col justify-center items-center rounded-[5px] bg-slate-300 p-4 w-1/2 h-[60%] relative">
                {children}
            </div>
        </div>
    );
};



export default ProductsModal;
