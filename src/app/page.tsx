import {auth} from "auth";
import { redirect } from "next/navigation";
import LogInPage from "@/components/LogInPage";

export default async function Home() {
  const session = await auth();
  
  if(!session) {
  return (
    <main>
      <LogInPage/>
    </main>
  );
  }
  redirect("/collection");
  
}
