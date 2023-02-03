export const getTodoCards = state => {
  if (!state.cards?.data?.length) return [];
  const cards = state.cards?.data?.filter(card => card.lista === 'todo');
  const orderedCards = cards?.sort((a, b) => {
    if (a.ordem < b.ordem) {
      return -1;
    }
    if (a.ordem > b.ordem) {
      return 1;
    }

    return 0;
  });
  return orderedCards;
};
export const getDoingCards = state => {
  if (!state.cards?.data?.length) return [];
  const cards = state.cards?.data?.filter(card => card.lista === 'doing');
  const orderedCards = cards?.sort((a, b) => {
    if (a.ordem < b.ordem) {
      return -1;
    }
    if (a.ordem > b.ordem) {
      return 1;
    }

    return 0;
  });
  return orderedCards;
};

export const getDoneCards = state => {
  if (!state.cards?.data?.length) return [];
  const cards = state.cards?.data?.filter(card => card.lista === 'done');
  const orderedCards = cards?.sort((a, b) => {
    if (a.ordem < b.ordem) {
      return -1;
    }
    if (a.ordem > b.ordem) {
      return 1;
    }

    return 0;
  });
  return orderedCards;
};
