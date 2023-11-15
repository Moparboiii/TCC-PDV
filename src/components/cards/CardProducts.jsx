import React from 'react';

const CardProducts = ({ name, code, className }) => {
  return (

    <div className={`rounded-2xl w-2/3 h-1/4 ${className}`}>
      <h1 className='text-2xl text-left'> {name} </h1>

      <div className='w-full rounded-2xl bg-[#226777] h-[100px] flex items-center p-3 '>
        <div className='bg-white w-full h-full flex items-center p-3 text-5xl'>
          {code}
        </div>
      </div>

    </div>
  );
};

export default CardProducts;
