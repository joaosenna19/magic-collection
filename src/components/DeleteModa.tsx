"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DeleteModal = () => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("deletemodal");
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await fetch(`/api/cards?id=${searchParams.get("id")}`, {
        method: "DELETE",
      });
      toast({
        title: "Card deleted",
        description: "The card was successfully deleted",
      });
      router.push("/collection");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error deleting the card",
      });
    }
  };

  return (
    <>
      {modal && (
        <div className="fixed left-0 top-0 w-full h-full bg-white bg-opacity-85 z-50 overflow-auto backdrop-blur flex justify-center items-center ">
          <div className="p-4 w-full max-w-md space-y-4 shadow">
            <div className="flex justify-end space-x-2">
              <p>Are you sure you want to delete it?</p>
              <Link href="/collection">
                <Button variant="destructive">Cancel</Button>
              </Link>
              <Button variant="outline" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
