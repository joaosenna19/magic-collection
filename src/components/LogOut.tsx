"use client";

import { signOut } from "next-auth/react";

const LogOut = () => {
  return (
    <p
      className="text-black text-xs text-center italic"
      onClick={() => {
        signOut({ callbackUrl: "/"});
      }}
    >
      <a href="">Log out</a>
    </p>
  );
};

export default LogOut;
