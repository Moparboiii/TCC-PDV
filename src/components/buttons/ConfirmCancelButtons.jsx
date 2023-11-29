import React from 'react';

const ConfirmCancelButtons = ({ onClick1, onClick2, className }) => {
    return (
        <div id="botoes" className={`w-full h-full flex flex-row justify-around items-center gap-3 ${className}`}>
            <button
                onClick={onClick1}
                type='submit'
                className="w-full h-full flex justify-center items-center gap-3 hover:opacity-90 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 duration-300 rounded-[10px] text-white">
                Sim
            </button>
            <button
                onClick={onClick2}
                className="w-full h-full flex justify-center items-center gap-3 hover:opacity-90 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 duration-300 rounded-[10px] text-white">
                Não
            </button>
        </div>
    );
};

export default ConfirmCancelButtons;