'use client'

import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { BsSearch } from "react-icons/bs";
import Image from 'next/image';
import Weather from '@/components/Weather';
import Spinner from '@/components/Spinner';


const Home = () => {

  const [city, setCity]=useState('');
  const [weather, setWeather]=useState({});
  

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
 

  const fetchWeather =(e)=>{
    e.preventDefault();
    

    axios.get(url).then((response) => {
      setWeather (response.data)
      // console.log(response.data)
    })
    setCity('')
    
    return;
  };



  return (
    <div className='px-[2rem]'>
      {/* overlay */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/20 z-[1]'/>

      {/* background image */}
      <Image src='https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
      layout='fill'
      className='object-cover'
      alt='image'
      />


      {/* search */}
      <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10'>
        <form onSubmit={fetchWeather} className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl'>
          <div>
            <input 
            onChange={(e)=>setCity(e.target.value)}
            className='bg-transparent border-none text-white outline-none text-2xl' type="text" placeholder='Search city' />
          </div>
          <button onClick={fetchWeather}><BsSearch size={20}/></button>
        </form>
         
      </div>

      {/* weather */}
      {weather.main && <Weather data={weather}/>}

  

    </div>
  )

}



export default Home;
