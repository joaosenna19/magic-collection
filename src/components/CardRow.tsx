import { TableRow, TableCell } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

type CardRowProps = {
  card: {
    id: number;
    name: string;
    set: string;
    condition: string;
    language: string;
    quantity: number;
  };
};
const CardRow = (props: CardRowProps) => {
  let { name, quantity, condition, language, set } = props.card;

  return (
    <TableRow>
      <TableCell className="font-medium">{quantity}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{set}</TableCell>
      <TableCell>{condition}</TableCell>
      <TableCell>{language}</TableCell>
      <TableCell><Button variant="destructive" size="sm" className="">Delete</Button></TableCell>
    </TableRow>
  );
};

export default CardRow;


