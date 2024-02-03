import Image from "next/image";
import logo from ".././app/assets/bigatheartslogo.png";

export default function AboutUs() {
  return (
    <div className="grid md:grid-cols-3 px-3 mx-auto w-screen items-center bg-white">
      <Image src={logo} alt="logo" width={700} height={700} />
      <div className="flex flex-col justify-center bg-gray-100 rounded-xl font-poppins border-[#8B0000] border-8 md:col-span-2 sm:m-16 py-16">
        <div className="mx-8">
          <h1 className="text-4xl font-bold my-4 text-center">Who We Are</h1>
          <p className="text-xl font-medium text-center">
            Big At Heart is a Non-Profit Social Service Organization inspiring
            GIVING through Volunteering, Donations-in-kind, and Fundraising. We
            help match volunteers and donors to curated causes, specifically
            those working for Children, Women, and Low Income communities. We
            create custom giving projects or connect you to existing causes that
            you can get involved in.
          </p>
        </div>
      </div>
    </div>
  );
}
