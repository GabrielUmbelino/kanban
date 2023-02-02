import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { getCards } from 'store/cardsSlice';
import { BoardColumn } from './board-column';
import { BoardCard } from './board-card';
import { CardModal } from './card-modal';
import { Loading } from 'components/shared';
import { getTodoCards, getDoingCards, getDoneCards } from 'store/selectors';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const Board = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.cards);
  const todoCards = useSelector(state => getTodoCards(state));
  const doingCards = useSelector(state => getDoingCards(state));
  const doneCards = useSelector(state => getDoneCards(state));
  const [card, setCard] = React.useState(null);
  React.useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

  const allCards = {
    todoCards,
    doingCards,
    doneCards,
  };

  const onDragEnd = React.useCallback(
    result => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        const items = reorder(
          allCards[source.droppableId],
          source.index,
          destination.index
        );

        if (source.droppableId === 'todoCards') {
          // setTodoCards(items);
        } else if (source.droppableId === 'doingCards') {
          // setDoingCards(items);
        } else if (source.droppableId === 'doneCards') {
          // setDoneCards(items);
        }
      } else {
        const sourceList = allCards[source.droppableId];
        const destinationList = allCards[destination.droppableId];
        const result = move(sourceList, destinationList, source, destination);

        if ('todoCards' in result) {
          // setTodoCards(result.todoCards);
        } else if ('doingCards' in result) {
          // setDoingCards(result.doingCards);
        } else if ('doneCards' in result) {
          // setDoneCards(result.doneCards);
        }
      }
    },
    [allCards]
  );

  const onAddCard = React.useCallback(({ list }) => {
    setCard({ list });
  }, []);

  const onSaved = React.useCallback(() => {}, []);

  if (loading === 'loading') <Loading />;

  return (
    <div className='flex flex-grow px-10 mt-4 space-x-6 overflow-auto'>
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardColumn
          name={'Todo'}
          count={todoCards?.length}
          droppableId='todoCards'
          onAddCard={onAddCard.bind({ list: 'todo' })}
        >
          {todoCards?.map((card, index) => (
            <BoardCard key={card.id} index={index} {...card} />
          ))}
        </BoardColumn>

        <BoardColumn
          name={'Doing'}
          count={doingCards?.length}
          droppableId='doingCards'
          onAddCard={onAddCard.bind({ list: 'doing' })}
        >
          {doingCards?.map((card, index) => (
            <BoardCard key={card.id} index={index} {...card} />
          ))}
        </BoardColumn>

        <BoardColumn
          name={'Done'}
          count={doneCards?.length}
          droppableId='doneCards'
          onAddCard={onAddCard.bind({ list: 'done' })}
        >
          {doneCards?.map((card, index) => (
            <BoardCard key={card.id} index={index} {...card} />
          ))}
        </BoardColumn>
      </DragDropContext>

      {card && <CardModal onSaved={onSaved} {...card} />}
      <div className='flex-shrink-0 w-6'></div>
    </div>
  );
};
