
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const LogIn = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">Welcome</h1>
        <form>
          <div className="mb-4">
            <Input placeholder="Email" type="email" />
          </div>
          <div className="mb-8">
            <Input placeholder="Password" type="password" />
          </div>
          <div className="mb-6">
            <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white">Login</Button>
          </div>
          <div className="text-center">
            <p className="text-sm">
              Don't have an account?
              <Link className="text-cyan-600" href="#">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogIn;

