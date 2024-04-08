"use client";
import { Input } from "@/components/ui/input";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import CardRow from "./CardRow";

const Dashboard = ({ userId }: { userId: string }) => {
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    const response = await fetch(`/api/cards?userId=${userId}`);
    const data = await response.json();
    setCards(data);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="flex flex-col justify-between  mb-4">
        <h1 className="text-3xl font-bold md:mx-10 mx-5">Collection</h1>
        <div className="flex space-x-2 mt-5 justify-between mx-auto md:mx-0">
          <Input className="" placeholder="Search your cards" />
          <Link href={`/collection?addmodal=true&userId=${userId}`}>
            <Button
              variant="outline"
              className="bg-gradient-to-r from-cyan-300 to-purple-400 text-bold"
            >
              Add Card
            </Button>
          </Link>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Qty</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Set</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Language</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cards.map((card, index) => (
            <CardRow key={index} card={card} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;
