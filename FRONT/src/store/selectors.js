export const getTodoCards = state => {
  if (!state.cards?.data?.length) return []
  return state.cards?.data?.filter(card => card.lista === 'todo');
};
export const getDoingCards = state => {
  if (!state.cards?.data?.length) return []
  return state.cards?.data?.filter(card => card.lista === 'doing');
};

export const getDoneCards = state => {
  if (!state.cards?.data?.length) return []
  return state.cards?.data?.filter(card => card.lista === 'doing');
};
