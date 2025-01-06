import React from 'react'
import { cn } from '@/lib/utils'

function Container({children, className}: {children : React.ReactNode, className? : string}) {
  return (
    <div className={cn('max-w-[1350px] mx-auto px-5 bg-[#F3AB5F] rounded-xl  w-full h-[550px]', className)}>{children}</div>
  )
}

export default Container