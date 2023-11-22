import React, { Children } from "react";
import ConfirmCancelButtons from './../buttons/ConfirmCancelButtons';

const SalesModal = ({ className, children1, id, TotalValue, onClick1, onClick2 }) => {

    return (
        <div id={id} className={`absolute bg-[#d9d9d9] w-1/2 h-1/2 border-[8px] border-gray-400 p-2 rounded-xl hidden flex-row gap-2 z-20 ${className}`}>
            <div id="CartProducts" className="flex justify-center items-center w-2/4 h-full flex-col ">
                <div id="titulo-cart" className="flex bg-[#226777] text-white w-full justify-around">
                    <h1 className="text-lg font-medium text-center w-1/3"> Nome </h1>
                    <h1 className="text-lg font-medium text-center w-1/3"> Valor </h1>
                    <h1 className="text-lg font-medium text-center w-1/3"> Quantidade </h1>
                </div>
                <div id="itens-cart" className="w-full overflow-auto h-full relative">
                    {children1}
                </div>
            </div>
            <div className="bg-red-300 w-1/2 h-full flex flex-col justify-center items-center gap-3 relative p-4">
                <h3 className="text-4xl h-1/3">Valor total da compra</h3>
                <div className="bg-gray-300 w h-2/3 w-full flex items-center justify-center">
                    <h2 className="text-3xl"> R${TotalValue} </h2>
                </div>
                <ConfirmCancelButtons className='h-1/3' onClick1={onClick1} onClick2={onClick2}/>
            </div>
        </div>
    );
};

export default SalesModal;