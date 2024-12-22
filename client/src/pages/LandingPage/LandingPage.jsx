import React from 'react'

import Banner from '../../Components/LandingPageComponents/Banner/Banner'
import OurBenefits from '../../Components/LandingPageComponents/OurBanefits/OurBenefits'
import HowItWorks from '../../Components//LandingPageComponents/HowItWorks/HowItWorks'
import Pricing from '../../Components/LandingPageComponents/Prices/Pricing'
import FAQs from '../../Components/LandingPageComponents/FAQS/FAQs'
// import Blog from '../../Components/Blog/Blog'
import Footer from '../../Components/LandingPageComponents/Footer/Footer'
import Navbar from '../../Components/LandingPageComponents/Navbar/Navbar'


const LandingPage = () => {
  return (
    <div className='flex justify-center'>
      
      <div className=''>
        <Navbar/>
        <Banner/>
        {/* <VideoSection/> */}
        <OurBenefits/>
        <HowItWorks/>
        <Pricing/>
        <FAQs/>
        <Footer/>


      </div>
    </div>
  )
}

export default LandingPage
