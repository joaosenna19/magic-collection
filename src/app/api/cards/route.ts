import { NextRequest } from "next/server";
import { prisma } from "@/db/db";

export async function GET() {
  try {
    const cards = await prisma.card.findMany();
    console.log(cards);
    return Response.json(cards);
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, quantity, condition, language, set, imageUrl } =
      await req.json();
    const newCard = await prisma.card.create({
      data: {
        name,
        quantity,
        condition,
        language,
        set,
        imageUrl,
      },
    });
    return Response.json(newCard);
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
        id: query ?? undefined,
      },
    });
    return Response.json(deletedCard);
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}

export async function PUT(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("id");
    const { quantity, condition, language } = await req.json();
    const updatedCard = await prisma.card.update({
      where: {
        id: query ?? undefined,
      },
      data: {
        quantity,
        condition,
        language,
      },
    });
    return Response.json(updatedCard);
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}
