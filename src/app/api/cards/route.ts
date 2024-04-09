import { NextRequest } from "next/server";
import { prisma } from "@/db/db";



export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  try {
    const cards = await prisma.card.findMany({
      where: {
        userId: userId as string, 
      },
    }
    );
    console.log(cards);
    return Response.json(cards);
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}

export async function POST(req: NextRequest) {

  try {
    const { userId, name, quantity, condition, language, set, imageUrl } =
      await req.json();
    const existingCard = await prisma.card.findFirst({
      where: {
        userId,
        name,
        condition,
        language,
        set,
      },
    });
    if (existingCard) {
      const updatedCard = await prisma.card.update({
        where: {
          id: existingCard.id,
        },
        data: {
          quantity: quantity,
        },
      });
      return Response.json(updatedCard);
    } else {
      const newCard = await prisma.card.create({
        data: {
          userId,
          name,
          quantity,
          condition,
          language,
          set,
          imageUrl,
        },
      });
      return Response.json(newCard);
    }
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("id");
    const deletedCard = await prisma.card.delete({
      where: {
        id: query as string,
      },
    });
    return Response.json(deletedCard);
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}


