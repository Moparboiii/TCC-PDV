import React from "react";
import NavbarComp from "../components/NavbarComp";

const HomePage = () => {

  return (
    <div className="flex justify-center items-center">
      <NavbarComp></NavbarComp>

      <div className="bg-slate-400 w-4/5 h-screen flex justify-center items-center">
        <h1 className="text-7xl animate-jump-in"> Bem vindo a Casa De Carnes kanaa </h1>
      </div>

    </div>
  );
};

export default HomePage;
