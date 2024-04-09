import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Image from "next/image";

type CardRowProps = {
  card: {
    id: number;
    name: string;
    set: string;
    condition: string;
    language: string;
    quantity: number;
    imageUrl: string;
  };
};
const CardRow = (props: CardRowProps) => {
  let { id, name, quantity, condition, language, set, imageUrl } = props.card;

  return (
    <TableRow>
      <TableCell className="font-medium">{quantity}</TableCell>

      <TableCell className="underline">
        <Link
          href={`collection?editmodal=true&id=${id}&quantity=${quantity}&condition=${condition}&language=${language}`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger> {name} </TooltipTrigger>
              <TooltipContent>
                <Image src={imageUrl} width="160" height="160" alt=""></Image>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      </TableCell>

      <TableCell>{set}</TableCell>
      <TableCell>{condition}</TableCell>
      <TableCell>{language}</TableCell>
      <TableCell>
        <Link href={`/collection?deletemodal=true&id=${id}`}>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default CardRow;
