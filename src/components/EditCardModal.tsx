"use client";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

const EditCardModal = () => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("editmodal");
  const [card, setCard] = useState({
    name: "",
    set: "",
    imageUrl: "",
    condition: " ",
    language: " ",
    quantity: 0,
  });

  const id = searchParams.get("id");

  useEffect(() => {
    const fetchCard = async () => {
      const response = await fetch(`/api/card?id=${id}`);
      const data = await response.json();
      setCard(data);
    };

    if (id) {
      fetchCard();
    }
  }, [id]);

  const cardSchema = z.object({
    quantity: z.coerce
      .number()
      .positive({ message: "Must be greater than zero" }),
    condition: z.enum(["M", "NM", "SP", "MP", "HP", "DMG"]),
    language: z.enum([
      "English",
      "Japanese",
      "Korean",
      "Chinese",
      "Spanish",
      "French",
      "German",
      "Italian",
      "Portuguese",
      "Russian",
    ]),
  });

  type cardSchema = z.infer<typeof cardSchema>;

const { register, handleSubmit, formState, clearErrors } =
    useForm<cardSchema>({
        resolver: zodResolver(cardSchema),
        defaultValues: {
            quantity: card.quantity,
            condition: card.condition as cardSchema['condition'] | undefined,
            language: card.language as cardSchema['language'] | undefined,
        },
    });

  const onSubmit: SubmitHandler<cardSchema> = async (data) => {
    clearErrors();
    console.log(data);
    // try {
    //   await fetch(`/api/card?id=${id}`, {
    //     method: "PUT",
    //     body: JSON.stringify(data),
    //   }).then(() => {
    //     console.log("Card updated")
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <>
      {modal && (
        <Card className="w-[350px] fixed left-0 top-0 w-full h-full bg-white bg-opacity-60 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="p-4 w-full max-w-md space-y-4 shadow">
            <CardHeader>
              <CardTitle>Edit your card</CardTitle>
              <CardDescription>
                You can change the languange, condition and quantity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                <div className="flex justify-center">
                  <Image
                    src={card.imageUrl}
                    width="170"
                    height="170"
                    alt="image"
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input readOnly placeholder={card.name} />
                </div>
                <div className="grid grid-cols-4 ">
                  <div className="space-y-2 mr-2">
                    <Label>Qty</Label>
                    <Input
                      type="number"
                      {...register("quantity")}
                      placeholder={card.quantity.toString()}
                    />
                    {formState.errors.quantity && (
                      <p
                        className="text-xs text-red-400 m-1 text-center"
                        style={{ fontSize: "0.50rem" }}
                      >
                        {formState.errors.quantity.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 col-span-3">
                    <Label>Set</Label>
                    <Input readOnly placeholder={card.set}></Input>
                  </div>
                </div>
                <div className="grid grid-cols-4 ">
                  <div className="space-y-2 mr-2 ">
                    <Label>Language</Label>
                    <Select {...register("language")}>
                      <SelectTrigger>
                        <SelectValue placeholder={card.condition} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">EN</SelectItem>
                        <SelectItem value="Japanese">JP</SelectItem>
                        <SelectItem value="Korean">KR</SelectItem>
                        <SelectItem value="Chinese">CH</SelectItem>
                        <SelectItem value="Spanish">SP</SelectItem>
                        <SelectItem value="French">FR</SelectItem>
                        <SelectItem value="German">GR</SelectItem>
                        <SelectItem value="Italian">IT</SelectItem>
                        <SelectItem value="Portuguese">PR</SelectItem>
                        <SelectItem value="Russian">RU</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-3">
                    <Label>Condition</Label>
                    <Select {...register("condition")}>
                      <SelectTrigger className=" mt-2">
                        <SelectValue placeholder="Mint" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Mint</SelectItem>
                        <SelectItem value="NM">Near Mint</SelectItem>
                        <SelectItem value="SP">Slightly Played</SelectItem>
                        <SelectItem value="MP">Moderately Played</SelectItem>
                        <SelectItem value="HP">Heavily Played</SelectItem>
                        <SelectItem value="DMG">Damaged</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    type="submit"
                    className="mt-2 bg-blue-400 hover:bg-blue-500"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Link href="/collection">
                <Button variant="destructive">Cancel</Button>
              </Link>
            </CardFooter>
          </div>
        </Card>
      )}
    </>
  );
};

export default EditCardModal;
