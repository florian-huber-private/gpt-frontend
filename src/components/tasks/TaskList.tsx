import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTasks } from '../../services/TaskService';
import { ITask } from '../../types/interfaces';
import { toast } from 'react-toastify';

const TaskList: React.FC = () => {
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const fetchedTasks = await getTasks();
				setTasks(fetchedTasks);
			} catch (error) {
				console.error('Fehler beim Laden der Aufgaben:', error);
				toast.error('Aufgaben konnten nicht geladen werden.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchTasks();
	}, []);

	if (isLoading) {
		return <p>Lädt Aufgaben...</p>;
	}

	if (!tasks.length) {
		return (
			<div className="container mt-4">
				<h2>Aufgabenliste</h2>
				<p>
					Es sind keine Aufgaben vorhanden. Erstellen Sie eine neue
					Aufgabe.
				</p>
				<Link to="/create-task" className="btn btn-primary">
					Neue Aufgabe erstellen
				</Link>
			</div>
		);
	}

	return (
		<div className="container mt-4">
			<h2 className="mb-4">Aufgabenliste</h2>
			<Link to="/create-task" className="btn btn-primary mb-3">
				Neue Aufgabe erstellen
			</Link>
			<div className="list-group">
				{tasks.map((task) => (
					<Link
						key={task.id}
						to={`/task/${task.id}`}
						className="list-group-item list-group-item-action">
						<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1">{task.title}</h5>
							<small>{task.priority}</small>
						</div>
						<p className="mb-1">{task.description}</p>
						<small>
							Fällig am:{' '}
							{task.due_date
								? new Date(task.due_date).toLocaleDateString()
								: 'Kein Datum'}
						</small>
					</Link>
				))}
			</div>
		</div>
	);
};

export default TaskList;
