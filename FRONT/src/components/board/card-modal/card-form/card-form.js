import React from 'react';
import { useSelector } from 'react-redux';

export const CardForm = ({ onSave, onCancel, card }) => {
  const { loading } = useSelector(state => state.cards);
  const [titulo, setTitulo] = React.useState(card.titulo);
  const [conteudo, setConteudo] = React.useState(card.conteudo);
  const [lista, setLista] = React.useState(card.lista);

  const onChangeTitle = e => setTitulo(e.target.value);
  const onChangeContent = e => setConteudo(e.target.value);
  const onChangeList = e => setLista(e.target.value);

  const onSubmit = () => {
    if (!titulo || !conteudo || !lista) return;
    onSave({ ...card, titulo, conteudo, lista });
  };

  return (
    <div className='w-full '>
      <div>
        <div className='flex -mx-3'>
          <div className='w-full px-3 mb-5'>
            <label className='text-xs font-semibold px-1'>
              Título
            </label>
            <div className='flex'>
              <input
                value={titulo}
                onChange={onChangeTitle}
                type='text'
                className='w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                placeholder='Insira um título'
              />
            </div>
          </div>
        </div>
        <div className='flex -mx-3'>
          <div className='w-full px-3 mb-5'>
            <label className='text-xs font-semibold px-1'>
              Conteúdo
            </label>
            <div className='flex'>
              <input
                value={conteudo}
                onChange={onChangeContent}
                type='text'
                placeholder='Insira um conteúdo'
                className='w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
              />
            </div>
          </div>
        </div>
        <div className='flex -mx-3'>
          <div className='w-full px-3 mb-5'>
            <label className='text-xs font-semibold px-1'>
              Lista
            </label>
            <div className='relative'>
              <select
                value={lista}
                onChange={onChangeList}
                class='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-state'
              >
                <option value={'todo'}>À Fazer</option>
                <option value={'doing'}>Em Progresso</option>
                <option value={'done'}> Pronto </option>
              </select>
              <div class='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  class='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className='flex -mx-3 mt-6'>
          <div className='w-full px-3 flex'>
            {loading === 'pending' ? (
              <div class='flex items-center justify-center'>
                <button
                  type='button'
                  class='inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow cursor-not-allowed hover:bg-indigo-400'
                  disabled=''
                >
                  <svg
                    class='w-5 h-5 mr-3 -ml-1 text-white animate-spin'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      class='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      stroke-width='4'
                    ></circle>
                    <path
                      class='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Salvando...
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onCancel}
                  class='bg-transparent text-indigo-500 font-semibold py-2 px-4 rounded'
                >
                  Cancelar
                </button>
                <button
                  onClick={onSubmit}
                  className='block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold'
                >
                  Salvar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
