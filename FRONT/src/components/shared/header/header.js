import React from 'react';

export const Header = () => (
  <div className='flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75'>
    <input
      className='flex items-center h-10 px-4 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring'
      type='search'
      placeholder='Search'
    />
  </div>
);
