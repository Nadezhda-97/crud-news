import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types/NewsItem';

interface NewsFormProps {
  onSubmit: (item: NewsItem) => void;
  existingItem?: NewsItem;
}

const NewsForm: React.FC<NewsFormProps> = ({ onSubmit, existingItem }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (existingItem) {
      setTitle(existingItem.title);
      setContent(existingItem.content);
    }
  }, [existingItem]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const item = {
      id: existingItem ? existingItem.id : Date.now(),
      title,
      content,
    };
    onSubmit(item);
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        autoFocus
      />
      <textarea
        placeholder="Содержание"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">{existingItem ? 'Обновить' : 'Добавить'}</button>
    </form>
  );
};

export default NewsForm;
