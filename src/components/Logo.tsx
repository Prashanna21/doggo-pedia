import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to={"/"}>
        <div className='text-3xl text-white font-bold font-ubuntu flex cursor-pointer'>
        <img src='/images/Logo.png' className='w-12 h-12'/>
        <div  className='mt-1'><span className='text-[#E40F24] font-extrabold tracking-widest'>Doggo</span>Pedia</div> </div>
    </Link>
  )
}

export default Logo