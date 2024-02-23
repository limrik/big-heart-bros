"use client";
import React from "react";
import AboutUs from "../components/about-us";
import WaysToGive from "../components/ways-to-give";
import backgroundImage from "./assets/bigathearts1.png";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserTypeStore, UserType } from "../store/zustand";
import OrgPage from "./(routes)/org-myevents/[id]/page";
import AdminPage from "./(routes)/admin/home/page";

interface User {
  id: string;
  name: string;
}

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const { userType, setUserType } = useUserTypeStore();

  useEffect(() => {
    if (session) {
      const param = session.user?.email;

      const fetchData = async () => {
        try {
          console.log(param);
          const res = await fetch(`/api/checkUserByEmail/${param}`);
          const data = await res.json();
          setUser(data.name);
          if (data.message == "User not found") {
            router.push("/sign-up");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [session]);

  const handleSignIn = async () => {
    await signIn();
  };

  return (
    <div>
      {userType === UserType.VOLUNTEER && (
        <div>
          <div
            className="bg-no-repeat bg-cover h-[800px]"
            style={{ backgroundImage: `url(${backgroundImage.src})` }}
          >
            <div className="bg-gray-900/40 absolute top-[62px] left-0 w-full h-[800px]">
              <div className="absolute top-[145px] w-full h-2/3 flex flex-col justify-center text-white">
                <div>
                  <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl drop-shadow-2xl font-poppins text-center gradient-text">
                    When volunteering starts changing lives,
                    <br />
                    so does yours.
                  </h1>
                  <p className="font-poppins text-base sm:text-xl text-center mx-4 mt-8 mb-12 animate-bounce">
                    Start your giving journey with us!
                  </p>

                  <div className="justify-center flex">
                    <Link
                      className="cursor-pointer border-2 border-white rounded-3xl w-[400px] text-center text-lg sm:text-2xl sm:h-16 h-12 flex justify-center items-center transition hover:bg-[#ff5656] bg-gray-600/70 font-poppins font-semibold mx-8"
                      href="/opportunities"
                    >
                      Volunteering Opportunities
                    </Link>
                    <button
                      className="cursor-pointer border-2 border-white rounded-3xl w-[400px] text-center text-lg sm:text-2xl sm:h-16 h-12 flex justify-center items-center transition hover:bg-[#ff5656] bg-gray-600/70 font-poppins font-semibold mx-8"
                      onClick={handleSignIn}
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#fcb6b6] h-screen"></div>
          <div className="absolute top-[700px]">
            <WaysToGive />
          </div>
          <div className="absolute top-[1100px]">
            <AboutUs />
          </div>
        </div>
      )}

      {userType === UserType.ORGANISATION && (
        <OrgPage params={{ id: "org_2" }} />
      )}
      {userType === UserType.ADMIN && <AdminPage />}
    </div>
  );
};

export default Home;
