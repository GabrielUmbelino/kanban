export const getTodoCards = state => {
  if (!state.cards?.data?.length) return [];
  const cards = state.cards?.data?.filter(card => card.lista === 'todo');
  return cards
};

export const getDoingCards = state => {
  if (!state.cards?.data?.length) return [];
  const cards = state.cards?.data?.filter(card => card.lista === 'doing');
  return cards;
};

export const getDoneCards = state => {
  if (!state.cards?.data?.length) return [];
  const cards = state.cards?.data?.filter(card => card.lista === 'done');
  return cards;
};
