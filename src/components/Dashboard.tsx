import { Input } from "@/components/ui/input";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const Dashboard = () => {
  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="flex flex-col justify-between  mb-4">
        <h1 className="text-3xl font-bold md:mx-10 mx-5">Collection</h1>
        <div className="flex space-x-2 mt-5 justify-between mx-auto md:mx-0">
          <Input className="" placeholder="Search your cards" />
          <Link href={`/?addmodal=true`}>
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
          <TableRow>
            <TableCell className="font-medium">2</TableCell>
            <TableCell>Jirina Kudro</TableCell>
            <TableCell>Lotr</TableCell>
            <TableCell>Mint</TableCell>
            <TableCell>EN</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">2</TableCell>
            <TableCell>Meu nome e muito grande hahahahah</TableCell>
            <TableCell>Lotr</TableCell>
            <TableCell>Mint</TableCell>
            <TableCell>EN</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;
