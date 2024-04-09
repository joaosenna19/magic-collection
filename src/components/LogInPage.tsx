"use client";

import { Button } from "@/components/ui/button";
import  GoogleIcon  from "@/components/icons/GoogleIcon";
import { signIn } from "next-auth/react";

const LogInPage = () => {
  return (
    <div className="grid gap-0 lg:grid lg:gap-0 lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh] h-screen">
      <div className="order-1 flex items-center justify-center p-6 space-y-6 lg:order-1 lg:p-10 items-center bg-gradient-to-r from-pink-100 via-red-200 to-purple-400">
        <div className="mx-auto space-y-6 text-white text-center ">
          <div className="space-y-2">
            <h1 className="text-3xl text-black font-bold">
              Welcome to Magic Collection
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Deck building made easy
            </p>
          </div>
          <div className="space-y-4">
            <ul className="text-sm text-gray-500 dark:text-gray-400 font-bold">
              <li>Search any MTG Card</li>
              <li>Add cards to your collection</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="order-2 p-6 bg-gray-100 rounded-lg dark:bg-gray-800 lg:order-2 lg:flex lg:items-center lg:justify-center lg:p-10">
        <div className="mx-auto space-y-6 text-center h-full flex items-center">
          <div className="p-6 bg-gray-100 rounded-lg dark:bg-gray-800 lg:flex lg:items-center lg:justify-center lg:p-10 ">
            <div className="mx-auto space-y-6">
              <div className="text-3xl font-bold">
                Sign in or sign up with Google
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Click the button below to sign in to your account
              </p>
              <Button
                className="w-full"
                onClick={() => signIn("google", { callbackUrl: "/collection" })}
              >
                <GoogleIcon />
                Sign in with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;

