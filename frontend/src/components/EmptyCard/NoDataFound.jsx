import { SearchX } from 'lucide-react'
import React from 'react'

const NoDataFound = ({
    message,
}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-10'>
        <SearchX className='text-xl'/>

        <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5'>
            {message}
        </p>
    </div>
  )
}

export default NoDataFound