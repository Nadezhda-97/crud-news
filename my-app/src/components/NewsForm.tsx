import React, { useState } from 'react';
import { NewsItem } from '../types/NewsItem';

interface NewsFormProps {
  onSubmit: (item: NewsItem) => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const item = {
      id: Date.now(),
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
      <button type="submit">Добавить</button>
    </form>
  );
};

export default NewsForm;
