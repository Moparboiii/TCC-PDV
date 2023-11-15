import React from 'react';

const CrudButton = ({ texto, isVisible, onClick, className }) => {
    return (
        <div className={`w-full h-[15%] flex items-center justify-center ${isVisible ? '': 'hidden'}`}>
            <button 
            className={`w-[90%] h-full flex justify-center items-center gap-3 hover:opacity-90 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 duration-300 rounded-[10px] text-white ${className}`} 
            onClick={onClick}>
                <h1 className="text-xl text-center"> {texto} </h1>
            </button>
        </div>
    );
};



export default CrudButton;
