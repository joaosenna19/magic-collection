import { useForm, SubmitHandler } from "react-hook-form";
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
import { useSearchParams } from "next/navigation";

const CardDetails = ({ selectCard }: any) => {
  const cardSchema = z.object({
    userId: z.string(),
    name: z.string().min(1).max(100),
    quantity: z.coerce
      .number()
      .positive({ message: "Must be greater than zero" }),
    condition: z.enum(["M", "NM", "SP", "MP", "HP", "DMG"], {
      errorMap: (issue, ctx) => {
        return {
          message:
            "Accepted conditios: M, NM, SP, MP, HP, DMG",
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
    set: z.string().min(1).max(100),
    imageUrl: z.string().url(),
  });

  type cardSchema = z.infer<typeof cardSchema>;

  const searchParams = useSearchParams();

  const { register, handleSubmit, formState, clearErrors, setValue, reset } =
    useForm<cardSchema>({
      resolver: zodResolver(cardSchema),
      defaultValues: {
        userId: searchParams.get("userId") as string,
        imageUrl: selectCard.image_uris.small,
      },
    });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit: SubmitHandler<cardSchema> = async (data) => {
    clearErrors();
    try {
      await fetch("/api/cards", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast({
              variant: "destructive",
              title: "Error",
              description: "There was an error adding the card",
            });
          } else {
            reset();
          }
        });
      toast({
        title: "Card added",
        description: "The card was successfully  added to your collection",
      });
      router.push("/collection");
    } catch {
      console.error();
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error adding the card",
      });
    }
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
        {formState.errors.name && (
          <p
            className="text-xs text-red-400 m-1 text-center"
            style={{ fontSize: "0.50rem" }}
          >
            {formState.errors.name.message}
          </p>
        )}
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
          {formState.errors.set && (
            <p
              className="text-xs text-red-400 m-1 text-center"
              style={{ fontSize: "0.50rem" }}
            >
              {formState.errors.set.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 ">
        <div className="space-y-2 mr-2 ">
          <Label>Language</Label>
          <Input {...register("language")} />
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
          <Input {...register("condition")} />
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
