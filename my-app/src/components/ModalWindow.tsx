import React from 'react';
import Modal from 'react-modal';

import EditNewsForm from './EditNewsForm';
import { NewsItem } from '../types/NewsItem';

interface ModalWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (item: NewsItem) => void;
  editingItem: NewsItem | null;
};

const ModalWindow: React.FC<ModalWindowProps> = ({ isOpen, onClose, onUpdate, editingItem }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Редактировать новость</h2>
        {editingItem && (
          <EditNewsForm
            editingItem={editingItem}
            onSubmit={onUpdate}
            onClose={onClose}
          />
        )}
      <button className="modal-close-button" onClick={onClose}>Отменить</button>
    </Modal>
  );
};

export default ModalWindow;
