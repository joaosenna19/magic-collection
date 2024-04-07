import { Table, TableRow, TableCell } from "@/components/ui/table";

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
  let { name, quantity, condition, language, set, imageUrl } = props.card;

  return (
    <TableRow>
      <TableCell className="font-medium">{quantity}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{set}</TableCell>
      <TableCell>{condition}</TableCell>
      <TableCell>{language}</TableCell>
    </TableRow>
  );
};

export default CardRow;
