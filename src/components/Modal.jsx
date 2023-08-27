import React from 'react';

const Modal = ({ isOpen, onClose, soldOrders }) => {
    if (!isOpen) return null;

    return (
        <div className=" bg-red-700 w-[500px] h-[500px]">
            <div className="modal-content">

            </div>
        </div>
    );
}

export default Modal;