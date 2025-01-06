// @ts-nocheck
import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TCreateAccountData } from '@/types'
import React from 'react'
import {useForm} from "react-hook-form"
import authService from "@/appwrite/auth"
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {login} from "@/store/authSlice"
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import {motion} from "motion/react"

 function Login() {
    const dispatch = useDispatch()
    const navigator = useNavigate()


    const onSubmit = async (data : any) => {
      toast.loading("Logging to your account", {
          description:"Trying given credentials",
          action: {
            label: "X",
            onClick: () => console.log("Undo"),
          },
          
        })

      try {
        const userData = await authService.login(data)
        if(userData){
          console.log(userData,userData.name)
           dispatch(login(userData))
            toast.dismiss()
           toast.success("Logged In Sucessfully", {
              description:"Your Account is logged in",
              action: {
                label: "X",
                onClick: () => console.log("Undo"),
              },
              
            })

            navigator("/")
        }



        
      } catch (error) {
        toast.dismiss()
        toast.error("Error Occured", {
          description: error.message,
          action: {
            label: "X",
            onClick: () => console.log("Undo"),
          },
          
        })
      }
    }
    


    const {
      register,
      handleSubmit,
      } = useForm()

  return (
    <motion.div
    initial = {{ opacity: 0, y: 45 }}
    whileInView={{  }}
    animate = {{scale: 1, opacity: 1, y: 0,
      transition: {
        duration : 0.7,
        type: "spring"
      }
    }}
    >
      <Container className='flex p-0 rounded-3xl '>
      
      <div className='flex-1 my-auto font-ubuntu'>
        <Toaster 
          position='top-center'
          
        />
        <form className='p-5 text-center flex items-center flex-col  gap-8' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2 className='text-3xl font-bold'>Log In To Your Account</h2>
            <p className=''>Don't have an account? <Link to="/register" className='underline'>Register Here</Link></p>
          </div>
          <div className='flex justify-center bg-[#FBEAC2] py-3 px-8 rounded-3xl items-center text-xl font-bold'>Email Addres: <Input className='ml-2 h-[42px] w-70' type='email' placeholder='Enter Your Email Address' {...register("email")}/></div>
          <div className='flex justify-center bg-[#FBEAC2] py-3 px-8 rounded-3xl items-center text-xl font-bold'>Password: <Input placeholder='Enter Your Password' className='ml-2 h-[42px] w-72' type='password' {...register("password")}/></div>
          <Button className='bg-[#FBEAC2] text-black font-bold text-xl rounded-2xl hover:bg-[#fadb93] px-10 py-6'>Login Account</Button>
        </form>
      </div>

      <div className='flex-1'>
        <img className='object-cover w-full h-full rounded-tr-3xl rounded-br-3xl'  src="/images/Labrodor_Register.jpg" alt="" />
      </div>
    </Container>
    </motion.div>
  )
}

export default Login