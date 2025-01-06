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

 function Register() {
    const dispatch = useDispatch()
    const navigator = useNavigate()


    const onSubmit = async (data : any) => {
      toast.loading("Creating Account", {
          description:"Your Account is being created",
          action: {
            label: "X",
            onClick: () => console.log("Undo"),
          },
          
        })

      try {
        const userData = await authService.createAccount(data)
        if(userData){
           dispatch(login(userData))
            toast.dismiss()
           toast.success("Account Created", {
              description:"Your Account is created",
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
    initial = {{ opacity: 0, y: 40 }}
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
            <h2 className='text-3xl font-bold'>Create New Account</h2>
            <p className=''>Already have an account? <Link to="/login" className='underline'>Login Here</Link></p>
          </div>
          <div className='flex justify-center bg-[#FBEAC2] py-3 px-8 rounded-3xl items-center text-xl font-bold'>UserName: <Input className='ml-2 h-[42px] w-72' placeholder='Enter Your UserName' type='text' required={true} {...register("username")}/></div>
          <div className='flex justify-center bg-[#FBEAC2] py-3 px-8 rounded-3xl items-center text-xl font-bold'>Email Addres: <Input className='ml-2 h-[42px] w-70' type='email' placeholder='Enter Your Email Address' {...register("email")}/></div>
          <div className='flex justify-center bg-[#FBEAC2] py-3 px-8 rounded-3xl items-center text-xl font-bold'>Password: <Input placeholder='Enter Your Password' className='ml-2 h-[42px] w-72' type='password' {...register("password")}/></div>
          <Button className='bg-[#FBEAC2] text-black font-bold text-xl rounded-2xl hover:bg-[#fadb93] px-10 py-6'>Create Account</Button>
        </form>
      </div>

      <div className='flex-1'>
        <img className='object-cover w-full h-full rounded-tr-3xl rounded-br-3xl'  src="/images/Labrodor_Register.jpg" alt="" />
      </div>
    </Container>
    </motion.div>
  )
}

export default Register