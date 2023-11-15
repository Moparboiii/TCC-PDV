import React from 'react';

const ConfirmCancelButtons = ({ texto, isVisible, onClick }) => {
    return (
        <div id="botoes" className="w-full h-1/4 flex justify-around items-center rounded-b-2xl">
            <button id="ConfirmEdit" onClick={onClick} className="bg-gradient-to-br from-indigo-500 rounded-full h-[60%] w-[40%] text-2xl"> Sim </button>
            <button id="CancelEdit" onClick={onClick} className="bg-gradient-to-br from-indigo-500  h-[60%] w-[40%] text-2xl rounded-full"> Não </button>
        </div>
    );
};



export default ConfirmCancelButtons;
