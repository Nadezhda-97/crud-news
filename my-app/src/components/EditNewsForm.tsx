import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types/NewsItem';

interface EditNewsFormProps {
  editingItem: NewsItem;
  onSubmit: (item: NewsItem) => void;
  onClose: () => void;
}

const EditNewsForm: React.FC<EditNewsFormProps> = ({ editingItem, onSubmit, onClose}) => {
  const [title, setTitle] = useState<string>(editingItem.title);
  const [content, setContent] = useState<string>(editingItem.content);

  useEffect(() => {
    setTitle(editingItem.title);
    setContent(editingItem.content);
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...editingItem, title, content });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
      />
      <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
      />
      <button type="submit">Обновить</button>
    </form>
  );
};

export default EditNewsForm;
