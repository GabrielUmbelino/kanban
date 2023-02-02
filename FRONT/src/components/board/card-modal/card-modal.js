import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'components/shared';
import { CardForm } from './card-form';
import { postCard } from 'store/cardsSlice';

export const CardModal = ({ onSaved, ...defaultCard }) => {
  const dispatch = useDispatch();
  const onSave = React.useCallback(
    card => dispatch(postCard(card, onSaved)),
    [dispatch, onSaved]
  );

  return (
    <Modal title={'Card'}>
      <CardForm defaultCard={defaultCard} onSave={onSave} />
    </Modal>
  );
};
