import React, { useEffect, useState } from 'react';
import NewsList from './components/NewsList';
import NewsForm from './components/NewsForm';
import ModalWindow from './components/ModalWindow';
import { NewsItem } from './types/NewsItem';

const App: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedNews = localStorage.getItem('news');
    if (storedNews) {
      setNews(JSON.parse(storedNews));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  const handleAdd = (item: NewsItem) => {
    setNews([...news, item]);
};

  const handleUpdate = (item: NewsItem) => {
    setNews(news.map((n) => (n.id === item.id ? item : n)));
    closeModal();
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setNews(news.filter((item) => item.id !== id));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div>
      <h1>Редактор новостей</h1>
      <NewsForm onSubmit={handleAdd} />
      <NewsList news={news} onEdit={handleEdit} onDelete={handleDelete} />
      <ModalWindow 
        isOpen={isModalOpen}
        onClose={closeModal}
        editingItem={editingItem}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default App;
