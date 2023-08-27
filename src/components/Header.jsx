import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-400 h-24">
      <div className="relative flex justify-center items-center">

        <div className="absolute top-7">
          <h1 className="text-2xl"> Bem vindo ao gigante KANAAAA</h1>
        </div>

        <div className="absolute top-7 right-10">
          <div className="group inline-block">
            <button className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32">
              <span className="pr-1 font-semibold flex items-center justify-between">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  version="1"
                  viewBox="0 0 50 50"
                >
                  <path
                    d="M192 420c-12-11-25-32-28-45-8-31 12-82 37-95 23-13 75-13 98 0 25 13 45 64 37 95-15 61-98 87-144 45zM160 201c-46-15-87-40-94-56-3-9-6-32-6-51V60h380v34c0 51-8 65-54 88-45 23-179 35-226 19z"
                    transform="matrix(.1 0 0 -.1 0 50)"
                  ></path>
                </svg>
                Login/Cadastro
              </span>
              <span>
                <svg
                  className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </span>
            </button>
            <ul className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 w-full">
              <li className="rounded-sm px-3 py-1 hover:bg-gray-100">Entrar</li>
              <li className="rounded-sm px-3 py-1 hover:bg-gray-100">DevOps</li>
            </ul>
          </div>
        </div>

        {/* <div className="bg-orange-300 absolute right-10">
          <Link to="/sobre" className="right-0">
            Sobre
          </Link>
        </div> */}

      </div>
    </header>
  );
};

export default Header;
