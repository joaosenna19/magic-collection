import { NextRequest } from "next/server";
import { prisma } from "@/db/db";


export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  try {
    const cards = await prisma.card.findUnique({
      where: {
        id: id as string,
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

export async function PUT(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("id");
    const { quantity, condition, language } = await req.json();
    const updatedCard = await prisma.card.update({
      where: {
        id: query as string,
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