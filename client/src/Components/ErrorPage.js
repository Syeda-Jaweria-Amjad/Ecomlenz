import React from 'react'

const ErrorPage = ({error, message}) => {
  return (
    <div className='w-[700px] h-96  flex flex-col justify-center items-center'>
            <p className='p-4 text-gray-800 font-extrabold text-3xl'>{message || "No Result Found"}</p>
        <div className='border border-black rounded-lg bg-black'>
            <p className='p-3 text-white font-semibold'>Manage Sellers</p>
        </div>
    </div>
  )
}

export default ErrorPage