"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

const LogIn = () => {
  const form = useForm();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">Welcome</h1>
        <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white" onClick={() => signIn("google", { callbackUrl: '/collection'})}>
              Sign in with Google
            </Button>
      </div>
    </div>
  );
};

export default LogIn;
