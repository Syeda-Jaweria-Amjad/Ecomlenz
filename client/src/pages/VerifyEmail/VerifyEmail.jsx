import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components/Loader";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../Components/ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";

const VerifyEmail = () => {
  const { token } = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setLoading(true);
        // const response = await axios.post(
        //   `http://localhost:8000/auth/confirm-email/${token}`,
        //   {
        //     withCredentials: true,
        //   }
        // );
        let response = await fetch(
          `http://localhost:8000/auth/confirm-email/${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Send cookies to the server with the request
          }
        );
        response = await response.json();
        setLoading(false);
        setVerified(true);
        console.log(response.message);
        handleShowSuccessToast(response.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } catch (error) {
        console.log(error?.message);
        handleShowFailureToast(error?.message);
        setLoading(false);
      }
    };
    verifyEmail();
  }, [token, navigate]);
  return (
    <>
      <Toaster />
      <div className="verify-email-container w-screen h-screen flex flex-col justify-center items-center">
        {isLoading ? (
          <div className="flex w-full h-full justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="lg:w-[30%] w-[70%] h-full flex flex-col items-center lg:justify-items-start justify-center gap-6">
            <img
              src={require("../../Components/Images/verify-email-tick.png")}
              alt=""
              className="w-40 h-40"
            />
            {verified ? (
              <h1 className="text-center text-xl font-bold">Email Verified</h1>
            ) : (
              <h1 className="text-center text-xl font-bold">
                Email Is Not Verified
              </h1>
            )}
            {verified ? (
              <h1 className="text-center">
                Your email address is verified successfully.
              </h1>
            ) : (
              <h1 className="text-red-500">
                Your email address is not verified.
              </h1>
            )}
            <button
              className="w-full bg-black h-12 border-none rounded-[30px] text-white bg-gradient-to-r from-[#020024] via-[#090979] to-[#4e97fd]"
              onClick={() => navigate("/consumer-home")}
            >
              Go to My Account
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default VerifyEmail;
