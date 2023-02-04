import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { BoardCard } from './board-card';
import { CardModal } from './card-modal';
import { Loading } from 'components/shared';
import { BoardColumn } from './board-column';
import { getCards, putCard, deleteCard } from 'store/cardsSlice';
import { getTodoCards, getDoingCards, getDoneCards } from 'store/selectors';

export const Board = () => {
  const dispatch = useDispatch();
  const [card, setCard] = React.useState(null);
  const { loading } = useSelector(state => state.cards);
  const todoCards = useSelector(state => getTodoCards(state));
  const doingCards = useSelector(state => getDoingCards(state));
  const doneCards = useSelector(state => getDoneCards(state));

  React.useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

  const onDragEnd = React.useCallback(
    result => {
      const allCards = {
        todo: todoCards,
        doing: doingCards,
        done: doneCards,
      };
      const { source, destination } = result;
      const card = {
        ...allCards[source.droppableId]?.[source.index],
        lista: destination.droppableId,
      };
      dispatch(putCard({ card }));
    },
    [dispatch, doingCards, doneCards, todoCards]
  );

  const onAddCard = React.useCallback(card => {
    setCard(card);
  }, []);

  const onEdit = React.useCallback(card => {
    setCard(card);
  }, []);

  const onDelete = React.useCallback(
    id => {
      dispatch(deleteCard({ id }));
    },
    [dispatch]
  );

  const onCancel = React.useCallback(() => setCard(null), []);
  if (loading === 'pending') {
    return (
      <div class='flex items-center justify-center h-screen'>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-grow px-10 mt-4 space-x-6 overflow-auto'>
        <DragDropContext onDragEnd={onDragEnd}>
          <BoardColumn
            name={'À Fazer'}
            count={todoCards?.length}
            droppableId='todo'
            onAddCard={onAddCard.bind(null, { lista: 'todo' })}
          >
            {todoCards?.map((card, index) => (
              <BoardCard
                key={card.id}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
                {...card}
              />
            ))}
          </BoardColumn>

          <BoardColumn
            name={'Em Progresso'}
            count={doingCards?.length}
            droppableId='doing'
            onAddCard={onAddCard.bind(null, { lista: 'doing' })}
          >
            {doingCards?.map((card, index) => (
              <BoardCard
                key={card.id}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
                {...card}
              />
            ))}
          </BoardColumn>

          <BoardColumn
            name={'Pronto'}
            count={doneCards?.length}
            droppableId='done'
            onAddCard={onAddCard.bind(null, { lista: 'done' })}
          >
            {doneCards?.map((card, index) => (
              <BoardCard
                key={card.id}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
                {...card}
              />
            ))}
          </BoardColumn>
        </DragDropContext>

        <div className='flex-shrink-0 w-6'></div>
      </div>
      {card && <CardModal onCancel={onCancel} {...card} />}
    </>
  );
};
