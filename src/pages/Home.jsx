import React from "react";
import NavbarComp from "../components/NavbarComp";

const HomePage = () => {

  return (
    <div className="p-3 flex h-screen w-screen justify-center items-center">
      <NavbarComp />

      <div className="bg-[#d9d9d9] w-4/5 h-full flex justify-center items-center rounded-xl border-[1px] shadow-2xl">
        <h1 className="text-7xl animate-jump-in"> Bem vindo a Casa De Carnes kanaa </h1>
      </div>

    </div>
  );
};

export default HomePage;
