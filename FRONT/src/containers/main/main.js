import React from 'react';
import { useSelector } from 'react-redux';
import { Board, Header, LoginModal } from 'components';
import { Loading } from 'components/shared';

export const MainContainer = () => {
  const { token, loading } = useSelector(state => state.auth);
  if (loading === 'loading') <Loading />

  return (
    <div className='flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200'>
      <Header />
      <div className='px-10 mt-6'>
        <h1 className='text-2xl font-bold'>Team Project Board</h1>
      </div>
      {token && <Board />}
      {!token && <LoginModal />}
    </div>
  );
};
