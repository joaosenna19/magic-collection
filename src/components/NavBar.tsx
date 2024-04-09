
import  Link  from "next/link";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { auth } from "auth";
import LogOut  from "@/components/LogOut";
import AvatarIcon from "./AvatarIcon";
const NavBar = async () => {
  


  return (
    <nav className="flex flex-row items-center h-12 px-4 border-b bg-white w-full dark:bg-gray-950 justify-between py-9">
      <Link className="mr-4 flex items-center gap-2" href="/collection">
        <span className="font-semibold">Magic Collection</span>
      </Link>
      <div className="flex flex-col">
      <AvatarIcon/>
      <LogOut/>
      </div>
    </nav>
  );
};

export default NavBar;
