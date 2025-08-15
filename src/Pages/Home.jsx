import React from 'react'
import { useNavigate } from "react-router-dom";



const Home = () => {
const navigate = useNavigate();


  return (
    <div className='w-full h-full flex flex-col md:flex-row gap-3 justify-between p-4'>
     
     {/* 1️⃣ total ORDERS */}
      <div 
      onClick={()=> navigate('/Orders')}
      className='hover:scale-105 transition-all ease-in-out duration-500 rounded-md bg-white flex flex-col lg:flex-row  px-4 py-8 border-2 border-[var(--heading-color)] cursor-pointer'>
        <h1 className=' font-[loginFont] text-xl md:text-2xl lg:text-3xl   font-bold '>TOTAL ORDERS</h1>
        <h3 className='rounded-full w-25 h-25 flex flex-col justify-center items-center font-bold text-white text-4xl bg-[var(--main-color)]'>200
          <h6 className='text-xs'>Orders</h6>
        </h3>
      </div>


        {/* 2️⃣ total PRODUCTS */}
      <div 
      onClick={()=> navigate('/List')}
      className='hover:scale-105 transition-all ease-in-out duration-500 rounded-md bg-white flex flex-col lg:flex-row px-4 py-8 border-2 border-[var(--heading-color)] cursor-pointer'>
        <h1 className=' font-[loginFont] text-xl md:text-2xl lg:text-3xl  font-bold '>TOTAL PRODUCTS</h1>

        <h3 className='rounded-full w-25 h-25 flex flex-col justify-center items-center font-bold text-white text-4xl bg-[var(--main-color)]'>18
          <h6 className='text-xs'>Products</h6>
        </h3>
      </div>
     
       {/* 3️⃣ REGISTER USERS */}
      <div 
      onClick={()=> navigate('/List')}
      className='hover:scale-105 transition-all ease-in-out duration-500 rounded-md bg-white flex flex-col lg:flex-row  px-4 py-8 border-2 border-[var(--heading-color)] cursor-pointer'>
        <h1 className=' font-[loginFont] text-xl md:text-2xl lg:text-3xl  font-bold '>REGISTER USERS</h1>
        <h3 className='rounded-full w-25 h-25 flex flex-col justify-center items-center font-bold text-white text-4xl bg-[var(--main-color)]'>28
          <h6 className='text-xs'>USERS</h6>
        </h3>
      </div>
    </div>
  )
}

export default Home