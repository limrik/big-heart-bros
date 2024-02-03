// import React from 'react';
import Image from "next/image";
import featureImg1 from "../app/assets/featureImg1.png";
import featureImg2 from "../app/assets/featureImg2.png";
import featureImg3 from "../app/assets/featureImg3.png";

export default function WaysToGive() {
  return (
    <div className="bg-white/90 mx-auto shadow-2xl shadow-black w-5/6 rounded-xl">
      <h2 className="text-center font-poppins text-2xl font-semibold py-2">
        Ways to Give{" "}
      </h2>
      <div className="px-3 pb-3 grid sm:grid-cols-1 lg:grid-cols-3 gap-0 mx-auto">
        <div className=" mr-4">
          <Image
            src={featureImg1}
            className="h-48 w-100 object-cover rounded-xl"
            alt="/"
          />
          <div className="top-0 left-0 w-full h-full border-gray-300">
            <p className="left-4 top-36 text-xl font-semibold font-poppins">
              Donate
            </p>
            <p className="left-4 top-44 text-lg font-medium font-poppins">
              Every contribution matters. We appreciate any amount to help the
              needy!
            </p>
          </div>
        </div>
        <div className="mr-4">
          <Image
            src={featureImg2}
            className="h-48 w-100 object-cover rounded-xl"
            alt="/"
          />
          <div className="top-0 left-0 w-full h-full border-gray-300">
            <p className="left-4 top-36 text-xl font-semibold font-poppins">
              Volunteer
            </p>
            <p className="left-4 top-44 text-lg font-medium font-poppins">
              Join and be a part of our volunteer
              <br /> group!
            </p>
          </div>
        </div>
        <div>
          <Image
            src={featureImg3}
            className="h-48 w-100 object-cover rounded-xl"
            alt="/"
          />
          <div className="top-0 left-0 w-full h-full">
            <p className="left-4 top-36 text-xl font-semibold font-poppins">
              Collaborate
            </p>
            <p className="left-4 top-44 text-lg font-medium font-poppins">
              Write to us if you work directly with causes of children and youth
              in education!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
