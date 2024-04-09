import Dashboard from "@/components/Dashboard";
import NavBar from "@/components/NavBar";
import { auth } from "auth";
import { redirect } from "next/navigation";
export default async function Collection() {
  const session = await auth();
  const userId = session?.user?.id as string;

  if (!session) {
    redirect("/");
  }
  return (
    <>
      <NavBar />
      <Dashboard userId={userId} />
    </>
  );
}
