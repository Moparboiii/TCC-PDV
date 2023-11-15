import React from 'react';
import { Link } from "react-router-dom";

const NavButton = ({ texto, className, linkPage, image }) => {
    return (
        <Link to={linkPage}
            className={`w-[90%] h-[25%] flex justify-center items-center gap-3 hover:opacity-90 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 duration-300 rounded-[10px] text-white ${className}`} >
            <img src={image} alt="" />
            <span className="text-2xl"> {texto} </span>
        </Link>
    );
};

export default NavButton;
