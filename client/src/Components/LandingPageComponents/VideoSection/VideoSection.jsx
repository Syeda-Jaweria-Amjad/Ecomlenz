import React from 'react'
// import video from "../../Video/video.mp4"


const VideoSection = () => {
  return (
    <div className='flex justify-center mt-24 '>
        <div className='border-8 border-gray-200  bg-red rounded-2xl w-10/12'>
            
            <video className='rounded-2xl w-full' controls autoplay loop muted preload="metadata">
                {/* <source src={video} type="video/mp4" /> */}
                
                
            </video>
        </div>
    </div>
  )
}

export default VideoSection
