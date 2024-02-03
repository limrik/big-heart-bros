import React from "react";
import Navbar from "../../../components/navbar";

const Home: React.FC = () => {
  return (
    <div>
      <div className="h-screen bg-bg1 bg-no-repeat bg-cover h-[400px]">
        <div className="bg-gray-900/30 absolute top-0 left-0 w-full h-screen">
          <Navbar />
          <div className="absolute top-30 w-full h-2/3 flex flex-col justify-center text-white">
            <div>
              <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl drop-shadow-2xl font-poppins text-center">
                Welcome back!
              </h1>
              <p className="font-poppins text-base sm:text-xl text-center mx-4">
                Volunteer Baby!
              </p>
              <div className="justify-center flex">
                <div className="cursor-pointer border-2 border-white rounded-3xl w-48 text-center text-lg sm:text-2xl sm:h-16 h-12 flex justify-center items-center hover:bg-[#ffbf00] bg-gray-600/70 font-poppins font-semibold">
                  Start Now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
