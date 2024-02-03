"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/navigation-menu";

export default function Navbar() {
  return (
    // <main>
    <div className="bg-[#8B0000] h-12 flex flex-row items-center justify-center text-white grid-cols-2">
      <div className="mr-16 font-semibold font-poppins">BigHeartBros</div>
      <div className="mx-8 font-poppins cursor-pointer hover:text-blue-300">
        Home
      </div>
      <div className="mx-8 font-poppins cursor-pointer hover:text-blue-300">
        <button onClick={() => null}>Sign Out</button>
      </div>
    </div>
    // </main>
  );
}
