import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'components/shared';
import { LoginForm } from './login-form';
import { login, authSlice} from 'store/authSlice';

export const LoginModal = () => {
  const dispatch = useDispatch();
  const onLogin = React.useCallback(
    ({ user, password }) => {
      dispatch(login({ user, password }));
    },
    [dispatch]
  );

  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem('TOKEN_KEY') || "null");
    dispatch(authSlice.actions.setToken(token));
  },[dispatch])

  return (
    <Modal title={'Login'}>
      <LoginForm onLogin={onLogin} />
    </Modal>
  );
};
