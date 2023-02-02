import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'components/shared';
import { LoginForm } from './login-form';
import { login } from 'store/authSlice';

export const LoginModal = () => {
  const dispatch = useDispatch();
  const onLogin = React.useCallback(
    ({ user, password }) => {
      dispatch(login({ user, password }));
    },
    [dispatch]
  );

  return (
    <Modal title={'Login'}>
      <LoginForm onLogin={onLogin} />
    </Modal>
  );
};
