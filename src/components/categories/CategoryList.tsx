import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../services/CategoryService';
import { ICategory } from '../../types/interfaces';

const CategoryList: React.FC = () => {
	const [categories, setCategories] = useState<ICategory[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const fetchedCategories = await getCategories();
				setCategories(fetchedCategories);
			} catch (error) {
				console.error('Fehler beim Laden der Kategorien:', error);
			}
		};

		fetchCategories();
	}, []);

	return (
		<div className="container mt-4">
			<h2 className="mb-4">Kategorienliste</h2>
			<Link to="/create-category" className="btn btn-primary mb-3">
				Neue Kategorie erstellen
			</Link>
			<ul className="list-group">
				{categories.map((category) => (
					<li key={category.id} className="list-group-item">
						{category.name}
						<Link
							to={`/edit-category/${category.id}`}
							className="btn btn-sm btn-secondary float-end">
							Bearbeiten
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoryList;
