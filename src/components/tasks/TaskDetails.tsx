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
    return <p>Laden...</p>;
  }

  return (
    <div>
      <h2>Aufgabendetails</h2>
      <p>Titel: {task.title}</p>
      <p>Beschreibung: {task.description}</p>
      <p>Priorität: {task.priority}</p>
      <Link to={`/edit-task/${id}`}>Bearbeiten</Link>
    </div>
  );
};

export default TaskDetails;
