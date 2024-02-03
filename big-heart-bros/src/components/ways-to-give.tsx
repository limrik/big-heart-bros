// import React from 'react';
import Image from "next/image";
import featureImg1 from "../app/assets/featureImg1.png";
import featureImg2 from "../app/assets/featureImg2.png";
import featureImg3 from "../app/assets/featureImg3.png";

export default function WaysToGive() {
  return (
    <div className="bg-white/90 mx-auto max-w-[1240px] shadow-2xl shadow-black h-80 w-[1150px]">
      <h2 className="text-center font-poppins text-2xl font-semibold pt-2">
        Ways to Give{" "}
      </h2>
      <div className="px-3 pb-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-0">
        <div className="relative h-[280px]">
          <Image
            src={featureImg1}
            className="h-32 w-100 object-cover"
            alt="/"
          />
          <div className="absolute top-0 left-0 w-full h-full border-r-2 border-gray-300">
            <p className="left-4 top-36 text-xl font-semibold font-poppins absolute">
              Donate
            </p>
            <p className="left-4 top-44 text-lg font-medium font-poppins  absolute ">
              Every contribution matters. We appreciate any amount to help the
              needy!
            </p>
          </div>
        </div>
        <div className="relative">
          <Image
            src={featureImg2}
            className="h-32 w-100 object-cover"
            alt="/"
          />
          <div className="absolute top-0 left-0 w-full h-full border-r-2 border-gray-300">
            <p className="left-4 top-36 text-xl font-semibold font-poppins absolute">
              Volunteer
            </p>
            <p className="left-4 top-44 text-lg font-medium font-poppins  absolute ">
              Join and be a part of our volunteer
              <br /> group!
            </p>
          </div>
        </div>
        <div className="relative">
          <Image
            src={featureImg3}
            className="h-32 w-100 object-cover"
            alt="/"
          />
          <div className="absolute top-0 left-0 w-full h-full">
            <p className="left-4 top-36 text-xl font-semibold font-poppins absolute">
              Collaborate
            </p>
            <p className="left-4 top-44 text-lg font-medium font-poppins  absolute ">
              Write to us if you work directly with causes of children and youth
              in education!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
