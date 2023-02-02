import React from 'react';

export const LoginForm = ({ onLogin }) => {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onChangeUser = e => setUser(e.target.value);
  const onChangePassword = e => setPassword(e.target.value);
  const onSubmit = () => {
    if (!user || !password) return;
    onLogin({ user, password });
  };
  return (
    <div className='w-full '>
      <div>
        <div className='flex -mx-3'>
          <div className='w-full px-3 mb-5'>
            <label for='' className='text-xs font-semibold px-1'>
              Usuário
            </label>
            <div className='flex'>
              <input
                value={user}
                onChange={onChangeUser}
                type='text'
                className='w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                placeholder='user'
              />
            </div>
          </div>
        </div>
        <div className='flex -mx-3'>
          <div className='w-full px-3 mb-12'>
            <label for='' className='text-xs font-semibold px-1'>
              Senha
            </label>
            <div className='flex'>
              <input
                value={password}
                onChange={onChangePassword}
                type='password'
                className='w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                placeholder='************'
              />
            </div>
          </div>
        </div>
        <div className='flex -mx-3'>
          <div className='w-full px-3'>
            <button
              onClick={onSubmit}
              className='block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold'
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
