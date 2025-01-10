import { useState, useEffect } from 'react';

const NewsForm = ({ onSubmit, existingItem }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (existingItem) {
      setTitle(existingItem.title);
      setContent(existingItem.content);
    }
  }, [existingItem]);

  const handleSubmit = (event) => {
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
      <button type="submit">{existingItem ? 'Обновить' : 'Добавить'}</button> /// только Добавить
    </form>
  );
};

export default NewsForm;
