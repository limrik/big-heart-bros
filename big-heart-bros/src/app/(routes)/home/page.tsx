"use client";
import React from "react";
import AboutUs from "../../../components/about-us";
import WaysToGive from "../../../components/ways-to-give";
import backgroundImage from "../../assets/bigathearts1.png";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
}

interface Organisation {
  email: string;
  description: string;
}

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [org, setOrgState] = useState<Organisation>();
  const [isAdmin, setAdmin] = useState(false); //is admin
  const [isOrg, setOrg] = useState(false); //is admin
  const [isUsers, setUsers] = useState(false); //is admin

  async function fetchData(param) {
    try {
      // only email for admin
      if (param == "bigheartbros@gmail.com") {
        console.log("SETTING ADMIN TRUE");
        setAdmin(true);
        console.log(isAdmin);
        return;
      }

      try {
        const res1 = await fetch(`/api/organisationByEmail/${param}`);
        const data1 = await res1.json();
        console.log(data1);
        setOrgState(data1);

        if (data1.message == "Organisation not found") {
          // nothing
        } else {
          console.log("SETTING ORG TRUE");
          setOrg(true);
          return;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      if (!isOrg && !isAdmin) {
        const res = await fetch(`/api/checkUserByEmail/${param}`);
        const data = await res.json();
        console.log(data);
        setUser(data.name);
        if (data && Object.keys(data).length !== 0) {
          setUsers(true);
        }
        if (data.message == "User not found") {
          router.push("/sign-up");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (session) {
      const param = session.user?.email;
      fetchData(param);
    }
  }, [session]);

  // can tell user type
  console.log("ADMIN outside" + isAdmin);
  console.log("ORGANISATION outside" + isOrg);
  console.log("USER outside" + isUsers);

  const handleSignIn = async () => {
    await signIn();
  };

  return (
    <div>
      <div
        className="bg-no-repeat bg-cover h-[800px]"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <div className="bg-gray-900/40 absolute top-0 left-0 w-full h-[800px]">
          <div className="absolute top-[145px] w-full h-2/3 flex flex-col justify-center text-white">
            <div>
              <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl drop-shadow-2xl font-poppins text-center gradient-text">
                When volunteering starts changing lives,
                <br />
                it includes yours.
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
  );
};

export default Home;
