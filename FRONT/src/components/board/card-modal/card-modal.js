import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'components/shared';
import { CardForm } from './card-form';
import { postCard, putCard } from 'store/cardsSlice';

export const CardModal = React.memo(({ onCancel, ...card }) => {
  const dispatch = useDispatch();
  const onSave = React.useCallback(
    card => {
      if (card.id) {
        dispatch(putCard({ card, onCancel }));
      } else {
        dispatch(postCard({ card, onCancel }));
      }
    },
    [dispatch, onCancel]
  );

  return (
    <Modal title={'Cartão'}>
      <CardForm onSave={onSave} onCancel={onCancel} card={card} />
    </Modal>
  );
});
