import React from 'react'
import logo from "../../Images/logo.png"
import message from "../../Images/icons8-message-50.png"
import twitter from "../../Images/PAHeoepTCetDTW0prXRElehVlY.svg"
import fb from "../../Images/hIm2RsclTwpgvIqW6Mr3zi5yevw.svg"
import insta from "../../Images/xJ7GMeKQLgx4bFMTap0hIFb8E.svg"


const Footer = () => {
  return (
    <div  className='flex justify-center flex-col bg-gray-100 pt-16 pb-5'>
        <div className='flex justify-center'>
            <img src={logo} className='h-16' alt="" />
        </div>
        <div className="flex justify-center mt-10">
          <p className="text-xl text-center sm:w-9/12 md:w-11/12">
          Effortlessly receive updates on new products from Amazon resellers <br /> with our automated tracking tool.
          </p>
        </div>
        <div className='flex justify-center my-4 '>
            <div className='w-60 flex justify-center gap-3 border border-gray-300 p-2 rounded-lg'>
            <img src={message} className='w-5' alt="" />
            <div>
                info@ecomlenz.com
            </div>
            </div>

        </div>

        <div className='flex justify-center my-4 gap-4 '>
            <div className='p-4 bg-blue-900 rounded-lg'><img src={fb} alt="" /></div>
            <div className='p-4 bg-blue-900 rounded-lg'><img src={insta} alt="" /></div>
            <div className='p-4 bg-blue-900 rounded-lg'><img src={twitter} alt="" /></div>
            

        </div>
        <div className="flex justify-center mt-10">
          <p className="mb-3 text-lg text-center text-gray-800 font-semibold ">
          All Rights Reserved. Ecom-Lenz 2024 
          </p>
        </div>
    </div>
  )
}

export default Footer
