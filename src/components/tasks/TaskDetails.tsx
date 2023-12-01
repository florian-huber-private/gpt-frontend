import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTaskDetails } from '../../services/TaskService';
import { ITask } from '../../types/interfaces';

const TaskDetails: React.FC = () => {
  const [task, setTask] = useState<ITask | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const fetchTaskDetails = async () => {
        try {
          const fetchedTask = await getTaskDetails(parseInt(id));
          setTask(fetchedTask);
        } catch (error) {
          console.error('Fehler beim Laden der Aufgabendetails:', error);
        }
      };
      fetchTaskDetails();
    }
  }, [id]);

  if (!task) {
    return <div className="container mt-4">Laden...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Aufgabendetails</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{task.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Priorität: {task.priority}</h6>
          <p className="card-text">{task.description}</p>
          <p className="card-text"><small className="text-muted">Fällig am: {task.due_date || 'Kein Datum'}</small></p>
          <Link to={`/edit-task/${id}`} className="card-link">Bearbeiten</Link>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
