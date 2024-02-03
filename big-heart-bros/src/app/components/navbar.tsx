"use client";

import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="bg-[#8B0000] h-12 flex flex-row items-center justify-center text-white grid-cols-2">
        <div className="mr-16 font-semibold font-poppins">BigHeartBros</div>
        <Link className="mx-8 font-poppins cursor-pointer hover:text-blue-300" href="/home">Home</Link>
        <Link className="mx-8 font-poppins cursor-pointer hover:text-blue-300" href="/about">About Us</Link>
        <Link className="mx-8 font-poppins cursor-pointer hover:text-blue-300" href="/user-dashboard">Dashboard</Link>
        <Link className="mx-8 font-poppins cursor-pointer hover:text-blue-300" href="/profile">Profile</Link>
    </div>
  );
}
