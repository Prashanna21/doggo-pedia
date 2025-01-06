import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TCreateAccountData } from '@/types'
import React, { useState, useEffect } from 'react'
import {useForm} from "react-hook-form"
import authService from "@/appwrite/auth"
import dataBaseService from "@/appwrite/databaseConfig"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import {login} from "@/store/authSlice"
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import {motion} from "motion/react"

 function AddDog() {
    const navigator = useNavigate()
    const userName = useSelector((state) => state.authSliceReducer.userData.name)
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const onSubmit = async (data : any) => {
      toast.loading("Adding Dog", {
          description:"Your Dog is being added",
          action: {
            label: "X",
            onClick: () => console.log("Undo"),
          },
          
        })

      try {
        
        
        if(await dataBaseService.addDogInfo({...data, addedBy : userName})){
            toast.dismiss()
           toast.success("Dog info Created", {
              description:"Your Dog info is created",
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
      watch,
      register,
      handleSubmit,
      } = useForm()
    
    //For Previewing file
    useEffect(() => {
         const file = watch("image")[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
          }
    }, [watch("image")])
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
        <form className='p-5 text-center flex items-center flex-col  gap-6' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2 className='text-3xl font-bold'>Add New Dog Information</h2>
          </div>
          <div className='flex justify-center bg-[#FBEAC2] py-2 px-8 rounded-3xl items-center text-xl font-bold'>Name: <Input required={true} className='ml-2 h-[42px] w-72' placeholder='Enter Full Name Of Dog' type='text' {...register("dogName")}/></div>
          <div className='flex justify-center bg-[#FBEAC2] py-2 px-8 rounded-3xl items-center text-xl font-bold'>Life Spang: <Input required={true} className='ml-2 h-[42px] w-70' type='text' placeholder='Enter Life Span of Dog' {...register("lifeSpan")}/></div>
          <div className='flex justify-center bg-[#FBEAC2] py-2 px-8 rounded-3xl items-center text-xl font-bold'>Oirign:  <Input required={true} placeholder='Enter its origin' className='ml-2 h-[42px] w-72' type='text' {...register("origin")}/></div>
          <div className='flex justify-center bg-[#FBEAC2] py-2 px-8 rounded-3xl items-center text-xl font-bold'>Behaviour: <Input required={true} placeholder='Enter its behaviour' className='ml-2 h-[42px] w-72' type='text' {...register("behaviour")}/></div>
          <Input
          className='w-72'
          required={true} placeholder="Upload Your Dog Photo" type='file' accept='image/*' {...register("image")}/>
          <Button className='bg-[#FBEAC2] text-black font-bold text-xl rounded-2xl hover:bg-[#fadb93] px-10 py-6'>Submit Dog Info</Button>
        </form>
      </div>

      <div className='flex-1'>
        <img className='object-cover w-full h-full rounded-tr-3xl rounded-br-3xl'  src={
          imagePreview ? imagePreview : "/images/Labrodor_Register.jpg"
        } alt="" />
      </div>
    </Container>
    </motion.div>
  )
}

export default AddDog