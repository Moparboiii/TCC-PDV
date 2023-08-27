import React from "react";
import { Link } from "react-router-dom";
import Carrinho from "../assets/icons8-cart-50.svg";
import Casinha from "../assets/icons8-home.svg";
import Morfeu from "../assets/morfeu.png"
import "./css/NavbarComp.css";

const NavbarComp = () => {
  return (
    <div className="tudo bg-orange-500 h-screen w-1/5 flex flex-col justify-center items-center">
      <div className="bg-red-300 w-full h-[30%] flex justify-center items-center">
        <img src={Morfeu} alt="" className="foto rounded-full" />
      </div>
      <div className="bg-blue-300 w-full h-[70%] flex flex-col gap-20 justify-center items-center">
        <Link to="/" className="bg-red-300 w-[90%] h-36 flex justify-center items-center gap-3  hover:animate-jump hover:animate-ease-in-out">
          <img src={Casinha} alt="Tela Home" />
          <span className="text-2xl"> Home </span>
        </Link>
        <Link to="/Venda" className="bg-red-300 w-[90%] h-36 flex justify-center items-center gap-3 hover:animate-jump hover:animate-ease-in-out">
          <img src={Carrinho} alt="Tela de venda" />
          <span className="text-2xl"> Tela venda </span>
        </Link>
        <Link to="/Sobre" className="bg-red-300 w-[90%] h-36 flex justify-center items-center gap-3 hover:animate-jump hover:animate-ease-in-out">
          <span className="text-2xl"> Sobre </span>
        </Link>

      </div>
    </div>
  );
};

export default NavbarComp;
