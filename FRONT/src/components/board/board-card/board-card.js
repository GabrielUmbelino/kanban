import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export const BoardCard = React.memo(({ onDelete, onEdit, ...card }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  return (
    <Draggable draggableId={card.id} index={card.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDraggingOver ? 'dragging' : ''
          } relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100`}
          draggable='true'
        >
          <button
            onClick={() => setShowMenu(!showMenu)}
            className='absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex'
          >
            <svg
              className='w-4 h-4 fill-current'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
            </svg>
          </button>

          <div
            onClick={() => setShowMenu(false)}
            className={`${
              showMenu ? '' : 'hidden'
            } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white`}
            style={{
              position: 'absolute',
              right: '7px',
              top: '31px',
            }}
          >
            <ul
              className='py-2 text-sm text-gray-700'
              aria-labelledby='dropdownHoverButton'
            >
              <li>
                <span
                  onClick={() => onEdit(card)}
                  className='block px-4 py-2 hover:bg-gray-100'
                >
                  Editar
                </span>
              </li>
              <li>
                <span
                  onClick={() => onDelete(card.id)}
                  className='block px-4 py-2 hover:bg-gray-100 text-red-700'
                >
                  Deletar
                </span>
              </li>
            </ul>
          </div>

          <h3 className='text-md font-semibold'>{card.titulo}</h3>
          <h4 className='mt-3 text-sm font-medium'>{card.conteudo}</h4>
        </div>
      )}
    </Draggable>
  );
});
