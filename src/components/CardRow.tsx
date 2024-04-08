import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  let { id, name, quantity, condition, language, set } = props.card;

  return (
    <TableRow>
      <TableCell className="font-medium">{quantity}</TableCell>
      <Link href={`collection?editmodal=true&id=${id}`}>
      <TableCell className="underline">{name}</TableCell>
      </Link>
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
