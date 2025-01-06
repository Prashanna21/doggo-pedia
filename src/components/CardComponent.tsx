import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TCardComponentProps } from '@/types'
import {motion} from "motion/react"
import { cn } from "@/lib/utils"



export default function CardComponent({
  imgSrc = "Not Found",
  title = "Not Found",
  description = "Not Found",
  lifespan = "Not Found",
  origin = "Not Found",
  className,
  renderKey,
} : TCardComponentProps) {
  return (
    <motion.div
    key={renderKey}
    initial = {{ y: 15 }}
    whileInView={{  }}
    animate = {{scale: 1, opacity: 1, y: 0,
      transition: {
        duration : 0.5,
        type: "spring"
      }
    }}
    className={cn('inline-block z-10 ', className)}
    whileHover={{ scale: 1.1 , transition : {
      duration: 0.3,
      type: "spring"
    }}}
    >
      <Card className=' bg-[#F3AB5F] z-10'>
      <CardContent className='h-[280px] w-[320px] mx-auto '>
        <img src={imgSrc} className='w-full h-full object-cover rounded-md'></img>
      </CardContent>
      <CardHeader className='text-center mb-1'>
        <CardTitle className='font-ubuntu font-medium text-2xl text-center'>{title}</CardTitle>
        <CardTitle>Lifespan: {lifespan}</CardTitle>
        <CardTitle>Origin: {origin}</CardTitle>
        <CardDescription className='hyphens-manual'>{description}</CardDescription>
      </CardHeader>
      
    </Card>
    </motion.div>
  )
}
