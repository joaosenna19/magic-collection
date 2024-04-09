import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { auth } from "auth";

const AvatarIcon = async () => {
  const session = await auth();
  const initials = session?.user?.name
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
  const imageUrl = session?.user?.image;
    return(
      <Avatar className="mx-2">
      <AvatarImage src={imageUrl ?? ""} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
    )
};

export default AvatarIcon;