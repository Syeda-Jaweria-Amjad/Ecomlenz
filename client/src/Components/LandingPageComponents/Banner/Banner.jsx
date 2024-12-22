import React from "react";
// import texture from "";
import arrow from "../../Images/icons8-arrow-24 (1).png";
import curve_arrow from "../../Images/curve-arrow.svg"
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="mt-52">
      {/* <img src={texture} className='imgg' alt="Image with bottom fade"/> */}
        <div className="banner flex flex-col gap-3">
            <div className="text-3xl lg:text-6xl text-center font-bold md:text-4xl sm:text-4xl ">Track your favorite sellers <br />with ease.</div>
            
        </div>
        <div className="mt-10 flex justify-center">
            <p className="text-center text-xl mx-3 md:w-7/12">Ecom-Lenz hooks you up with the advance arbitrage leads for the sellers you're tracking, empowering you to boost profits and nail more successful flips on Amazon.</p>
        </div>
        <div className="flex justify-center gap-4 text-center mt-10">
                <div className="-ms-40 mt-5">
                    <img className="w-44" src={curve_arrow} alt="" />
                </div>
                <div>

              <Link to="signup">
                <div className="flex text-white border border-gray-900 py-2 px-5 rounded-xl bg-black gap-2 hover:gap-3">
                    <div className="">Enjoy a 14-day free trial</div>
                    <span className=""><img className="w-4 pt-1" src={arrow} alt="" /></span>
                </div>
              </Link> 
                
                </div>
                


        </div>
    </div>
  );
};

export default Banner;
