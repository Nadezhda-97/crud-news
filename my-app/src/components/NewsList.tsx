import React from "react";
import { NewsItem } from "../types/NewsItem";

interface NewsListProps {
  news: NewsItem[];
  onEdit: (item: NewsItem) => void;
  onDelete: (id: number) => void;
}

const NewsList: React.FC<NewsListProps> = ({ news, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Список новостей</h2>
      <ul>
        {news.length === 0
          ? "Добавьте новость, и она появится здесь"
          : news.map((item: NewsItem) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <button onClick={() => onEdit(item)}>Редактировать</button>
              <button onClick={() => onDelete(item.id)}>Удалить</button>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
