import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	createTask,
	getTaskDetails,
	updateTask,
} from '../../services/TaskService';
import {
	ICategory,
	ITask,
	TaskPriority,
	TaskStatus,
} from '../../types/interfaces';
import { toast } from 'react-toastify';
import { getCategories } from '../../services/CategoryService';

const TaskForm: React.FC = () => {
	const initialTaskState: ITask = {
		id: 0,
		user_id: 0, // Normalerweise durch den authentifizierten Benutzer bestimmt
		title: '',
		description: '',
		priority: TaskPriority.LOW,
		category_id: undefined,
		creation_date: new Date().toISOString(),
		due_date: undefined,
		status: TaskStatus.TODO,
	};

	const [task, setTask] = useState<ITask>(initialTaskState);
	const [categories, setCategories] = useState<ICategory[]>([]);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			const fetchTaskDetails = async () => {
				try {
					const fetchedTask = await getTaskDetails(parseInt(id));
					setTask(fetchedTask);
				} catch (error) {
					console.error(
						'Fehler beim Laden der Aufgabendetails:',
						error
					);
				}
			};
			fetchTaskDetails();
		}
	}, [id]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const fetchedCategories = await getCategories();
				setCategories(fetchedCategories);
			} catch (error) {
				console.error('Fehler beim Laden der Kategorien:', error);
				toast.error('Kategorien konnten nicht geladen werden.');
			}
		};

		fetchCategories();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setTask({ ...task, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (id) {
				await updateTask(parseInt(id), task);
				toast.success('Aufgabe erfolgreich aktualisiert!');
			} else {
				await createTask(task);
				toast.success('Aufgabe erfolgreich erstellt!');
			}
			navigate('/tasks');
		} catch (error: unknown) {
			console.error('Fehler beim Speichern der Aufgabe:', error);
			toast.error('Fehler beim Speichern der Aufgabe.');
		}
	};

	return (
		<div className="container mt-4">
			<h2>{id ? 'Aufgabe bearbeiten' : 'Neue Aufgabe erstellen'}</h2>
			<form onSubmit={handleSubmit} className="mt-3">
				{/* Titel */}
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Titel
					</label>
					<input
						type="text"
						className="form-control"
						id="title"
						name="title"
						value={task.title}
						onChange={handleChange}
						required
					/>
				</div>

				{/* Beschreibung */}
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Beschreibung
					</label>
					<textarea
						className="form-control"
						id="description"
						name="description"
						value={task.description}
						onChange={handleChange}
					/>
				</div>

				{/* Priorität */}
				<div className="mb-3">
					<label htmlFor="priority" className="form-label">
						Priorität
					</label>
					<select
						className="form-select"
						id="priority"
						name="priority"
						defaultValue={task.priority}
						onChange={handleChange}>
						<option value="LOW">Niedrig</option>
						<option value="MEDIUM">Mittel</option>
						<option value="HIGH">Hoch</option>
					</select>
				</div>

				{/* Fälligkeitsdatum */}
				<div className="mb-3">
					<label htmlFor="due_date" className="form-label">
						Fälligkeitsdatum
					</label>
					<input
						type="date"
						className="form-control"
						id="due_date"
						name="due_date"
						value={task.due_date?.split('T')[0] || ''}
						onChange={handleChange}
					/>
				</div>

				{/* Status */}
				<div className="mb-3">
					<label htmlFor="status" className="form-label">
						Status
					</label>
					<select
						className="form-select"
						id="status"
						name="status"
						value={task.status}
						onChange={handleChange}>
						<option value="TODO">To Do</option>
						<option value="IN_PROGRESS">In Progress</option>
						<option value="COMPLETED">Completed</option>
					</select>
				</div>

				<div className="mb-3">
					<label htmlFor="category" className="form-label">
						Kategorie
					</label>
					<select
						className="form-select"
						id="category"
						name="category_id"
						value={task.category_id || ''}
						onChange={handleChange}>
						<option value="">Keine Kategorie</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>

				<button type="submit" className="btn btn-primary">
					{id ? 'Aktualisieren' : 'Erstellen'}
				</button>
			</form>
		</div>
	);
};

export default TaskForm;
