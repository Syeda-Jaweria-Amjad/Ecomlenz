import React from "react";
import crown from "../../Images/icons8-crown-48.png";
import dot from "../../Images/icons8-dot-30.png";
import person from "../../Images/group.png"
import arrow from "../../Images/icons8-arrow-24 (1).png";
import curve_arrow from "../../Images/curve-arrow.svg"

const Pricing = () => {
  return (
    <div id="pricing" className="md:w-full sm:w-full pt-10">
      <div className="flex justify-center my-40 flex-col">
        <div className="m-auto text-center w-40 py-2 px-4 flex justify-center gap-1 border border-black rounded-3xl">
          <img src={crown} className="w-6 h-6 md:w-5 md:h-5 " alt="" />
          <hr className="rotate-90 w-3" />
          <div>
            <h2 className="text-lg">Subscriptions</h2>
          </div>
        </div>

        <div className="mt-10">
          <div className="text-3xl lg:text-6xl text-center font-bold md:text-4xl sm:text-4xl">Pricing Tiers</div>
        </div>

        <div className="mt-10 flex justify-center">
          <p className="text-center text-xl w-8/12 mx-20">
            Pricing that scales with your business. Select the plan that’s right
            for you
          </p>
        </div>

        <div className="m-auto mt-10 text-center  py-1 px-4 flex justify-center gap-1 border border-slate-300 rounded-xl">
          <img src={dot} className="w-6 h-6" alt="" />
          <hr className="rotate-90 w-3" />
          <div>
            <h2 className="text-lg ">We doubled our sellers per plan! </h2>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="sm:11/12 md:w-10/12">
            <div className="grid sm:grid-cols-2 md:grid-cols-4  gap-3 mt-10">
              <div class="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="/">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Standard
                  </h5>
                </a>
                <div className="border py-2 px-3 flex justify-center gap-2 rounded-xl sm:w-36 lg:w-36 md:w-32">
                    <img src={person} className="w-6 h-6 lg:w-6 lg:h-6 md:w-5 md:h-5" alt="" />
                    <p class=" font-semibold lg:text-lg md:text-md text-gray-700  dark:text-gray-400">
                    20 Sellers
                    </p>
                </div>
                <div className="mt-4 font-medium lg:text-xl md:text-lg sm:text-lg">
                  <li>Keepa Chart</li>
                  <li>Product Finder</li>
                  
                </div>                
                <hr className="my-6 w-60"/>

                <div className="flex">
                    <div className="text-4xl md:text-xl lg:text-4xl font-bold">
                        $35
                    </div>
                    <span className="text-xl font-semibold pt-2">/ per month</span>
                </div>
              </div>




              <div class="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="/">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Pro
                  </h5>
                </a>
                <div className="border py-2 px-3 flex justify-center gap-2 rounded-xl sm:w-44 lg:w-44 md:w-32">
                    <img src={person} className="w-6 h-6 lg:w-6 lg:h-6 md:w-5 md:h-5" alt="" />
                    <p class=" font-semibold text-lg text-gray-700  dark:text-gray-400">
                    40 Sellers
                    </p>
                </div>
                <div className="mt-4 font-medium lg:text-xl md:text-lg sm:text-lg">
                  <li>Keepa Chart</li>
                  <li>Product Finder</li>
                  <li>Profit Calculator</li>
                  
                </div>

                <hr className="my-6 w-60"/>

                <div className="flex">
                    <div className="text-4xl md:text-xl lg:text-4xl font-bold">
                        $70
                    </div>
                    <span className="text-xl font-semibold pt-2">/ per month</span>
                </div>
              </div>

              <div class="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="/">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Max
                  </h5>
                </a>
                <div className="border py-2 px-3 flex justify-center gap-2 rounded-xl sm:w-44 lg:w-44 md:w-32">
                    <img src={person} className="w-6 h-6 lg:w-6 lg:h-6 md:w-5 md:h-5" alt="" />
                    <p class=" font-semibold text-lg text-gray-700  dark:text-gray-400">
                    80 Sellers
                    </p>
                </div>
                <div className="mt-4 font-medium lg:text-xl md:text-lg sm:text-lg">
                  <li>Keepa Chart</li>
                  <li>Product Finder</li>
                  <li>Profit Calculator</li>
                  <li>Alerts</li>
                </div>
                <hr className="my-6 w-60"/>

                <div className="flex">
                    <div className="text-4xl md:text-xl lg:text-4xl font-bold">
                        $130
                    </div>
                    <span className="text-xl font-semibold pt-2">/ per month</span>
                </div>
              </div>

              <div class="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="/">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Ultra
                  </h5>
                </a>
                <div className="border py-2 px-3 flex justify-center gap-2 rounded-xl sm:w-44 lg:w-44 md:w-32">
                    <img src={person} className="w-6 h-6 lg:w-6 lg:h-6 md:w-5 md:h-5" alt="" />
                    <p class=" font-semibold text-lg text-gray-700  dark:text-gray-400">
                    200 Sellers
                    </p>
                </div>
                <div className="mt-4 font-medium lg:text-xl md:text-lg sm:text-lg">
                  <li>Keepa Chart</li>
                  <li>Product Finder</li>
                  <li>Profit Calculator</li>
                  <li>Alerts</li>
                  <li>Google Sheets</li>
                  
                  
                 
                </div>
                <hr className="my-6 w-60"/>

                <div className="flex">
                    <div className="text-4xl md:text-xl lg:text-4xl font-bold">
                        $230
                    </div>
                    <span className="text-xl font-semibold pt-2">/ per month</span>
                </div>
              </div>
            </div>
          </div>

          
        </div>
        <div className="flex justify-center gap-4 text-center mt-10">
                <div className="-ms-40 mt-5">
                    <img className="w-44" src={curve_arrow} alt="" />
                </div>
                <div>
                    
                <div className="flex text-white border border-gray-900 py-2 px-5 rounded-xl bg-black gap-2 hover:gap-3">
                    
                    <div className="">Try it for free for 14 Days</div>
                    <span className=""><img className="w-4 pt-1" src={arrow} alt="" /></span>
                </div>
                </div>
                </div>
      </div>
    </div>
  );
};

export default Pricing;
