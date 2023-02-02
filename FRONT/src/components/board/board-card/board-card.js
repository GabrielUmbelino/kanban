import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export const BoardCard = ({ id, titulo, conteudo, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${snapshot.isDraggingOver ? 'dragging' : ''} relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100`}
          draggable='true'
        >
          <button className='absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex'>
            <svg
              className='w-4 h-4 fill-current'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
            </svg>
          </button>
          <h3 className='text-md font-semibold'>{titulo}</h3>
          <h4 className='mt-3 text-sm font-medium'>{conteudo}</h4>
        </div>
      )}
    </Draggable>
  );
};
