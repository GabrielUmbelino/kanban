import React from 'react';

export const CardForm = ({ onSave }) => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [list, setList] = React.useState('');

  const onChangeTitle = e => setTitle(e.target.value);
  const onChangeContent = e => setContent(e.target.value);
  const onChangeList = e => setList(e.target.value);

  const onSubmit = () => {
    if (!title || !content || !list) return;
    onSave({ title, content, list });
  };
  return (
    <div className='w-full '>
      <div>
        <div className='flex -mx-3'>
          <div className='w-full px-3 mb-5'>
            <label for='' className='text-xs font-semibold px-1'>
              Título
            </label>
            <div className='flex'>
              <input
                value={title}
                onChange={onChangeTitle}
                type='text'
                className='w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                placeholder='Insira um título'
              />
            </div>
          </div>
        </div>
        <div className='flex -mx-3'>
          <div className='w-full px-3 mb-12'>
            <label for='' className='text-xs font-semibold px-1'>
              Conteúdo
            </label>
            <div className='flex'>
              <input
                value={content}
                onChange={onChangeContent}
                type='text'
                className='w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
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
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
