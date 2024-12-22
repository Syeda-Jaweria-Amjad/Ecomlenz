import React from "react";
import star from "../../Images/icons8-star-24.png";
import pic1 from "../../Images/pic1.svg";
import pic2 from "../../Images/pic2.svg";
import pic3 from "../../Images/pic3.svg";
import pic4 from "../../Images/pic4.svg";
import pic5 from "../../Images/pic5.svg";

const OurBenefits = () => {
  return (
    <div id="benefits" className="flex justify-center pt-20 flex-col">
      <div className="m-auto text-center w-40 py-2 px-4 flex justify-center gap-1 border border-black rounded-3xl">
        <img src={star} className="w-6 h-6" alt="" />
        <hr className="rotate-90 w-3" />
        <div>
          <h2 className="text-lg">Pros</h2>
        </div>
      </div>

      <div className="mt-10">
        <div className="text-3xl lg:text-6xl text-center font-bold md:text-4xl sm:text-4xl">Streamline Your Leads</div>
      </div>

      <div className="mt-10 flex justify-center">
        <p className="text-center text-xl w-8/12 mx-20">
        Bid farewell to seller confusion and welcome efficient reverse sourcing. Here's why our platform will become your go-to solution.
        </p>
      </div>
      
      <div className="flex justify-center">
        
      <div className="md:w-11/12 px-10">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 justify-center gap-3 mt-10">
            <div class="max-w-3xl h-96  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="/">
                <img class="rounded-t-lg w-full" src={pic1} alt="" />
            </a>
            <div class="p-5">
                <a href="/">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Efficient Seller Handling
                </h5>
                </a>
                <p class="mb-3  font-medium text-gray-800  dark:text-gray-400">
                  Effortlessly add, nickname, pause, active, and manage sellers from a single interface. It’s that straightforward.
                </p>
            </div>
            </div>

            <div class="max-w-2xl h-96  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="/">
                <img class="rounded-t-lg w-full md:h-60" src={pic2} alt="" />
            </a>
            <div class="p-5">
                <a href="/">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Store Products
                </h5>
                </a>
                <p class="mb-3 font-medium text-gray-800 dark:text-gray-400">
                  Store products in a tab for future review and never miss out on those must-have item again.
                </p>
            </div>
            </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 justify-center gap-3 mt-10">
        <div class="max-w-3xl  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="/">
                <img class="rounded-t-lg w-full" src={pic3} alt="" />
            </a>
            <div class="p-5">
                <a href="/">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Save & Label
                </h5>
                </a>
                <p class="mb-3 font-medium text-gray-800 dark:text-gray-400">
                Save your favorite sellers and give them nicknames for quick recognition—after all, remembering seller IDs can be a challenge!
                </p>
            </div>
            </div>

            <div class="max-w-3xl  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="/">
                <img class="rounded-t-lg w-full" src={pic4} alt="" />
            </a>
            <div class="p-5">
                <a href="/">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Advanced Search Criteria
                </h5>
                </a>
                <p class="mb-3 font-medium text-gray-800 dark:text-gray-400">
                  Filter product feeds by category, buy box, offers, sales, rank, and more to find exactly what you need. It’s like having a superpower for sourcing.
                </p>
            </div>
            </div>

            <div class="max-w-3xl  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="/">
                <img class="rounded-t-lg w-full" src={pic5} alt="" />
            </a>
            <div class="p-5">
                <a href="/">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Unified Product Feed
                </h5>
                </a>
                <p class="mb-3 font-medium text-gray-800 dark:text-gray-600">
                Explore newly listed products with detailed insights on prices, sales rank, stock levels, and Keepa charts — all essential data in one convenient view.
                </p>
            </div>
            </div>
            
        </div>
      </div>
      </div>
    </div>
  );
};

export default OurBenefits;
