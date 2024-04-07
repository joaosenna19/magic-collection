import { useForm, SubmitHandler, set } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const CardDetails = ({ selectCard }: any) => {
  const cardSchema = z.object({
    name: z.string().min(1).max(100),
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
    set: z.string().min(1).max(100),
    imageUrl: z.string().url(),
  });

  type cardSchema = z.infer<typeof cardSchema>;

  const { register, handleSubmit, formState, clearErrors, setValue, reset } =
    useForm<cardSchema>({
      resolver: zodResolver(cardSchema),
      defaultValues: {
        quantity: 1,
        condition: "NM",
        language: "English",
        imageUrl: selectCard.image_uris.small,
      },
    });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit: SubmitHandler<cardSchema> = async (data) => {
    clearErrors();
    console.log(data);
    toast({
      title: "Card added",
      description: "The card was successfully  added to your collection",
    });
    router.push("/collection");
  };

  const sanitazeData = () => {
    setValue("imageUrl", selectCard.image_uris.small);
    setValue("name", selectCard.name);
    setValue("set", selectCard.set_name);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
      <div className="flex justify-center">
        <Image
          src={selectCard.image_uris.small}
          width="170"
          height="170"
          alt="image"
          className="rounded-lg"
        />
      </div>

      <div className="space-y-2">
        <Label>Name</Label>
        <Input readOnly {...register("name")} placeholder={selectCard.name} />
      </div>
      <div className="grid grid-cols-4 ">
        <div className="space-y-2 mr-2">
          <Label>Qty</Label>
          <Input type="number" {...register("quantity")} />
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
          <Input
            readOnly
            {...register("set")}
            placeholder={selectCard.set_name}
          ></Input>
        </div>
      </div>
      <div className="grid grid-cols-4 ">
        <div className="space-y-2 mr-2 ">
          <Label>Language</Label>
          <Select {...register("language")}>
            <SelectTrigger>
              <SelectValue placeholder="EN" />
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
          className="mt-2 bg-green-400 hover:bg-green-500"
          onClick={() => sanitazeData()}
        >
          Add
        </Button>
      </div>
    </form>
  );
};

export default CardDetails;
