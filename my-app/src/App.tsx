import './App.css'
import { useEffect, useState } from 'react';
import NewsList from './components/NewsList';
import NewsForm from './components/NewsForm';

const App = () => {
  const [news, setNews] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const storedNews = localStorage.getItem('news');
    if (storedNews) {
      setNews(JSON.parse(storedNews));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  const handleAddOrUpdate = (item) => { // здесь только add
    if (editingItem) {
      setNews(news.map((n) => (n.id === item.id ? item : n)));
      setEditingItem(null);
    } else {
      setNews([...news, item]);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleDelete = (id) => {
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
