import React from "react";
import NavbarComp from "../components/NavbarComp";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center bg-red-700">
      <NavbarComp className=""> </NavbarComp>
      <div className="w-4/5 flex justify-center items-center flex-col">
        <h2 className="text-7xl">ERROR 404 - Página Não Encontrada</h2>
        <p className="text-4xl">Oops! Essa página não foi encontrada.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
