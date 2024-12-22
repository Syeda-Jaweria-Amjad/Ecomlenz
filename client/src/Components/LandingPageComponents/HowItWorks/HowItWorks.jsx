import React from "react";
import cube from "../../Images/icons8-cubes-24.png";
import pic1 from "../../Images/howitworks1.svg";
import pic2 from "../../Images/howitworks2.svg";
import pic3 from "../../Images/howitworks3.svg";

const HowItWorks = () => {
  return (
    <div id="working">
      <div className="flex justify-center pt-40 flex-col">
        <div className="m-auto text-center w-40 py-2 px-4 flex justify-center gap-1 border border-black rounded-3xl">
          <img src={cube} className="w-6 h-6" alt="" />
          <hr className="rotate-90 w-3" />
          <div>
            <h2 className="text-lg">Process</h2>
          </div>
        </div>

        <div className="mt-10">
          <div className="text-3xl lg:text-6xl text-center font-bold md:text-4xl sm:text-4xl">Explore More</div>
        </div>

        <div className="mt-10 flex justify-center">
          <p className="text-center text-xl w-8/12 mx-20">
          Ready to dive in? Start storefront stalking like a pro.
            
            Stay informed and make smart buying decisions.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="sm:w-11/12 md:w-10/12">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10">
              <div class="max-w-3xl  bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="/">
                  <img class="rounded-t-lg w-full" src={pic1} alt="" />
                </a>
                <div class="flex items-center justify-center w-full">
                  
                  <div class="bg-white text-black w-8 h-8 flex justify-center items-center p-1 mx-2 rounded-full">
                    3
                  </div>
                  
                </div>

                <div class="p-5">
                  <a href="/">
                    <h5 class="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Add Your Seller
                    </h5>
                  </a>
                  <p class="mb-3 text-center font-normal text-gray-700 dark:text-gray-400">
                    Enter your Amazon seller IDs to start <br /> tracking.
                  </p>
                </div>
              </div>

              <div class="max-w-3xl  bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="/">
                  <img class="rounded-t-lg w-full" src={pic2} alt="" />
                </a>
                <div class="flex items-center justify-center w-full">
                  
                  <div class="bg-white text-black w-8 h-8 flex justify-center items-center p-1 mx-2 rounded-full">
                    3
                  </div>
                  
                </div>
                <div class="p-5">
                  <a href="/">
                    <h5 class="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Receive Notifications
                    </h5>
                  </a>
                  <p class="mb-3 text-center font-normal text-gray-700 dark:text-gray-400">
                    Receive updates on new products add by <br /> your monitored
                    sellers.
                  </p>
                </div>
              </div>

              <div class="max-w-3xl  bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="/">
                  <img class="rounded-t-lg w-full" src={pic3} alt="" />
                </a>
                <div class="flex items-center justify-center w-full">
                  
                  <div class="bg-white text-black w-8 h-8 flex justify-center items-center p-1 mx-2 rounded-full">
                    3
                  </div>
                  
                </div>
                <div class="p-5">
                  <a href="/">
                    <h5 class="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Analyze and Buy
                    </h5>
                  </a>
                  <p class="mb-3 text-center font-normal text-gray-700 dark:text-gray-400">
                    Use the leads to purchase and flip <br /> products for a
                    profit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
