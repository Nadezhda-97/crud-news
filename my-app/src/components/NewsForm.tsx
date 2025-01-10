import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NewsItem } from '../types/NewsItem';

interface NewsFormProps {
  onSubmit: (item: NewsItem) => void;
  existingItem?: NewsItem;
}

const schema = Yup.object({
  title: Yup.string()
    .max(100, 'Заголовок не должен быть длиннее 100 символов')
    .required('Заголовок обязателен'),
  content: Yup.string()
    .min(5, 'Содержание должно содержать минимум 5 символов')
    .required('Содержание обязательно'),
});

const NewsForm: React.FC<NewsFormProps> = ({ onSubmit, existingItem }) => {
  //const [title, setTitle] = useState<string>('');
  //const [content, setContent] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      title: existingItem ? existingItem.title : '',
      content: existingItem ? existingItem.content : '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const item = {
        id: existingItem ? existingItem.id : Date.now(),
        title: values.title,
        content: values.content,
      };
      onSubmit(item);
      formik.resetForm();
    }
  })

  useEffect(() => {
    if (existingItem) {
      formik.setValues({
        title: existingItem.title,
        content: existingItem.content
      });
    }
  }, [formik, existingItem]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="text"
        placeholder="Заголовок"
        {...formik.getFieldProps('title')}
        autoFocus
      />
      {formik.touched.title && formik.errors.title ? (
        <div className="error-message">{formik.errors.title}</div>
      ) : null}
      <textarea
        placeholder="Содержание"
        {...formik.getFieldProps('content')}
      />
      {formik.touched.content && formik.errors.content ? (
        <div className="error-message">{formik.errors.content}</div>
      ) : null}
      <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
        {existingItem ? 'Обновить' : 'Добавить'}
      </button>
    </form>
  );
};

export default NewsForm;
