// src/components/NewsList.tsx
const NewsList = ({ news, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Список новостей</h2>
      <ul>
        {news.map((item) => (
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
