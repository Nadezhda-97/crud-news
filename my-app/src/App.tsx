import './App.css'
import React, { useEffect, useState } from 'react';
import NewsList from './components/NewsList';
import NewsForm from './components/NewsForm';
import { NewsItem } from './types/NewsItem';

const App: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    const storedNews = localStorage.getItem('news');
    if (storedNews) {
      setNews(JSON.parse(storedNews));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  const handleAddOrUpdate = (item: NewsItem) => {
    if (editingItem) {
      setNews(news.map((n) => (n.id === item.id ? item : n)));
      setEditingItem(null);
    } else {
      setNews([...news, item]);
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
  };

  const handleDelete = (id: number) => {
    setNews(news.filter((n) => n.id !== id));
  };

  return (
    <div>
      <h1>CRUD Новостей</h1>
      <NewsForm onSubmit={handleAddOrUpdate} existingItem={editingItem} />
      <NewsList news={news} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App
