import React from 'react';
import { useSelector } from 'react-redux';
import { Board, Header, LoginModal } from 'components';
import { Loading } from 'components/shared';

export const MainContainer = () => {
  const { token, loading } = useSelector(state => state.auth);
  if (loading === 'loading') <Loading />
  
  const renderContent = () => {
    if (!token) return <LoginModal />
    return <Board />
  }

  return (
    <div className='flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200'>
      <Header />
      {renderContent()}
    </div>
  );
};
