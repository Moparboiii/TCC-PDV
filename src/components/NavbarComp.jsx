import React from "react";
import Carrinho from "../assets/icons8-cart-50.svg";
import Casinha from "../assets/icons8-home.svg";
import Morfeu from "../assets/8b7ccd72-16b9-4376-a165-4d02f0a86391.jpeg"
import Lista from '../assets/icons8-lista-64.png'
import "./css/NavbarComp.css";
import NavButton from './buttons/NavButton';

const NavbarComp = ({ id }) => {
  return (
    <div id={id} className="h-full w-1/5 flex flex-col justify-center items-center p-3 ">
      <div className="w-full h-[30%] flex justify-center items-center">
        <img src={Morfeu} alt="" className="foto rounded-full opacity-90" />
      </div>
      <div className=" w-full h-[70%] flex flex-col gap-14 justify-center items-center">

        <NavButton linkPage='/' texto='Home' image={Casinha} />
        <NavButton linkPage='/Venda' texto='Tela Venda' image={Carrinho} />
        <NavButton linkPage='/Produtos' texto='Tela Produtos' image={Carrinho} />
        <NavButton linkPage='/vendas' texto='Histórico de vendas' image={Lista} />

      </div>
    </div>
  );
};

export default NavbarComp;
