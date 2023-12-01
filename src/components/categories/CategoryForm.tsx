import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createCategory, getCategoryDetails, updateCategory } from '../../services/CategoryService';
import { ICategory } from '../../types/interfaces';

const CategoryForm: React.FC = () => {
  const [category, setCategory] = useState<ICategory | any>({ name: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchCategoryDetails = async () => {
        try {
          const fetchedCategory = await getCategoryDetails(parseInt(id));
          setCategory(fetchedCategory);
        } catch (error) {
          console.error('Fehler beim Laden der Kategorie:', error);
        }
      };
      fetchCategoryDetails();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateCategory(parseInt(id), category);
      } else {
        await createCategory(category);
      }
      navigate('/categories');
    } catch (error) {
      console.error('Fehler beim Speichern der Kategorie:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Kategorie bearbeiten' : 'Neue Kategorie erstellen'}</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Kategoriename</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            name="name" 
            value={category.name} 
            onChange={handleChange} 
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Aktualisieren' : 'Erstellen'}</button>
      </form>
    </div>
  );
};

export default CategoryForm;
