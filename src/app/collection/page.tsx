import Dashboard from "@/components/Dashboard";
 import { auth } from "auth";
export default async function Collection() {
    const session = await auth()
    return (
    <>
        {session?.user?.name}
      <Dashboard />
    </>
  );
}
