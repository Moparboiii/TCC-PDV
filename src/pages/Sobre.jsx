import React from "react";
import { Link } from "react-router-dom";
import NavbarComp from "./../components/NavbarComp";

const SobrePage = () => {
  return (
    <div className="flex justify-center items-center">
      <NavbarComp></NavbarComp>
      <div className="tudo flex justify-center items-center flex-col w-4/5 h-screen">
        <div className="topo h-1/2 w-full flex justify-around items-center bg-red-500">
          <div className="bg-gray-300 w-1/5 h-[90%] flex justify-center items-center">
            Bloco
          </div>
          <div className="bg-gray-300 w-1/5 h-[90%] flex justify-center items-center">
            Bloco
          </div>
          <div className="bg-gray-300 w-1/5 h-[90%] flex justify-center items-center">
            Bloco
          </div>
        </div>

        <div className="baixo h-1/2 w-full flex justify-center items-center flex-col bg-blue-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            amet dolore est animi saepe exercitationem nobis accusamus
            consectetur sapiente sequi magnam pariatur voluptatem eum voluptate
            autem distinctio at, suscipit porro.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SobrePage;
