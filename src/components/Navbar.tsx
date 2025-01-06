import React from 'react'
import Logo from './Logo'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from "@/store/authSlice"
import authSerivce from "@/appwrite/auth"
function Navbar() {
  const dispatch = useDispatch()
  const loggedInStatus = useSelector((state) => state.authSliceReducer.loggedIn)
  const userName = useSelector((state) => state.authSliceReducer.userData.name)
  return (
    <nav className='fixed inline-block top-0 z-50 right-0 left-0 py-6 bg-[rgb(240,172,3)]'>
      <div className='max-w-[1400px] flex items-center justify-between mx-auto'>
        <Logo />
        <ul className="font-medium flex gap-3">
          {
            loggedInStatus && 
            <>
               <Link to='add-dog-info'><li className='bg-[#FBEAC2] rounded-full px-6 py-3 cursor-pointer text-black hover:bg-[#f9d98f]'>Add Dog Info</li></Link>
              <div onClick={() => {
                dispatch(logout())
                authSerivce.logout()
              }}><li className='bg-[#E40F24] rounded-full px-6 py-3 cursor-pointer text-white hover:bg-[#ff1515]'>Logout: {userName}</li></div>
            </>
            
          }

          {!loggedInStatus && 
            <>
              <Link  to='login'><li className='bg-[#FBEAC2] rounded-full px-6 py-3 cursor-pointer text-black hover:bg-[#f9d98f]'>Login</li></Link>
              <Link to='register'><li className='bg-[#E40F24] rounded-full px-6 py-3 cursor-pointer text-white hover:bg-[#ff1515]'>Register</li></Link>
            </>
          }
          
        </ul>
      </div>
    </nav>
  )
}

export default Navbar