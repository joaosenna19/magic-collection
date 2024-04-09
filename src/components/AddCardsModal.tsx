"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { searchCards } from "../../thirdPartyApiUtils";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import CardDetails from "@/components/CardDetails";

const AddCardsModal = () => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("addmodal");
  const [results, setResults] = useState([] as any[]);
  const [card, setCard] = useState({} as any);

  const cardSchema = z.object({
    name: z
      .string()
      .min(1, { message: "At least one character is required!" })
      .max(50),
  });

  type cardSchema = z.infer<typeof cardSchema>;

  const { register, handleSubmit, formState, clearErrors, reset, setValue } =
    useForm<cardSchema>({
      resolver: zodResolver(cardSchema),
    });

  const onSubmit: SubmitHandler<cardSchema> = async (data) => {
    clearErrors();
    const results = await searchCards(data.name);
    console.log(results);
    setResults(results?.data || []);
  };

  const handleCardSelect = (card: any) => {
    console.log(card);
    setCard(card);
  };

  return (
    <>
      {modal && (
        <Card className="w-[350px] fixed left-0 top-0 w-full h-full bg-white bg-opacity-60 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="p-4 w-full max-w-md space-y-4 shadow">
            <CardHeader>
              <CardTitle>Add to Collection</CardTitle>
              <CardDescription>
                Search for a card, then fill out all the properties.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="flex">
                  <Input
                    {...register("name")}
                    placeholder="Search for a card by name"
                  />

                  <Button type="submit" variant="outline" className="ml-2">
                    Search
                  </Button>
                </div>
                {formState.errors.name && (
                  <p className="text-xs text-red-400 m-1">
                    {formState.errors.name.message}
                  </p>
                )}
              </form>
              {results.length > 0 ? (
                <Select
                  onValueChange={(value) => handleCardSelect(value)}
                  value={card}
                >
                  <SelectTrigger className=" mt-2">
                    <SelectValue placeholder="Select a card" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {results.map((result, index) => (
                        <SelectItem key={index} value={result}>
                          {result.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : null}
              {card?.name && <CardDetails selectCard={card} />}
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

export default AddCardsModal;
