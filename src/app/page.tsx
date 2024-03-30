import Image from "next/image";
import LogIn from "@/components/LogIn";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between">
      <LogIn/>
    </main>
  );
}
