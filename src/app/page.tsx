import LogIn from "@/components/LogIn";
import {auth} from "auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  
  if(!session) {
  return (
    <main className="flex  flex-col items-center justify-between">
      <LogIn/>
    </main>
  );
  }
  redirect("/collection");
  
}
