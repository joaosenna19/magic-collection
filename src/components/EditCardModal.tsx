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
import { useState, useEffect } from "react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const EditCardModal = () => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("editmodal");

  const id = searchParams.get("id");
  const quantity = searchParams.get("quantity");
  const condition = searchParams.get("condition");
  const language = searchParams.get("language");

  useEffect(() => {
    const fetchCard = async () => {
      const response = await fetch(`/api/card?id=${id}`);
      const data = await response.json();
      console.log(data);
      setCard(data);
    };

    if (id) {
      fetchCard();
    }
  }, [id]);

  type CardType = {
    name: string;
    set: string;
    imageUrl: string;
    condition: string;
    language: string;
    quantity: number;
  };

  const [card, setCard] = useState<CardType>({
    name: "",
    set: "",
    imageUrl: "",
    condition: condition as string,
    language: language as string,
    quantity: parseInt(quantity as string),
  });

  const cardSchema = z.object({
    quantity: z.coerce
      .number()
      .positive({ message: "Must be greater than zero" }),
    condition: z.enum(["M", "NM", "SP", "MP", "HP", "DMG"], {
      errorMap: (issue, ctx) => {
        return {
          message: "Accepted conditios: M, NM, SP, MP, HP, DMG",
        };
      },
    }),
    language: z.enum(
      [
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
      ],
      {
        errorMap: (issue, ctx) => {
          return {
            message:
              "Accepted languages: English, Japanese, Korean, Chiense, Spanish, French, Italian, Portuguese and Russian",
          };
        },
      }
    ),
  });

  type cardSchema = z.infer<typeof cardSchema>;

  console.log(card.condition, card.language);

  const { register, handleSubmit, formState, clearErrors, reset } =
    useForm<cardSchema>({
      resolver: zodResolver(cardSchema),
      defaultValues: {
        quantity: card.quantity,
        condition: card.condition as cardSchema["condition"] ,
        language: card.language as cardSchema["language"],
      },
    });

  const router = useRouter();

  const onSubmit: SubmitHandler<cardSchema> = async (data) => {
    clearErrors();
    console.log(data);
    try {
      await fetch(`/api/card?id=${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      toast({
        title: "Card updated",
        description: "Your card has been updated",
      });
      router.push("/collection");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was an error updating the card",
      });
    }
  };

  return (
    <>
      {modal && card && (
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
                      placeholder={`${card.quantity}`}
                      defaultValue={card.quantity}
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
                    <Input
                      {...register("language")}
                      placeholder={card.language}
                    />
                    {formState.errors.language && (
                      <p
                        className="text-xs text-red-400 m-1 text-center"
                        style={{ fontSize: "0.50rem" }}
                      >
                        {formState.errors.language.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 col-span-3">
                    <Label>Condition</Label>
                    <Input
                      {...register("condition")}
                      placeholder={card.condition}
                    />
                    {formState.errors.condition && (
                      <p
                        className="text-xs text-red-400 m-1 text-center"
                        style={{ fontSize: "0.50rem" }}
                      >
                        {formState.errors.condition.message}
                      </p>
                    )}
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
                <Button variant="destructive" onClick={() => reset()}>
                  Cancel
                </Button>
              </Link>
            </CardFooter>
          </div>
        </Card>
      )}
    </>
  );
};

export default EditCardModal;
