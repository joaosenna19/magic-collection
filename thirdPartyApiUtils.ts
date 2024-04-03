type CardSearchResult = {
  data: [];
};

export const searchCards = async (
  cardName: string
): Promise<CardSearchResult | undefined> => {
  try {
    const res = await fetch(
      `https://api.scryfall.com/cards/search?q=${cardName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
