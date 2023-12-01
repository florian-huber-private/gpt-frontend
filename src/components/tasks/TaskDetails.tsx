import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTaskDetails } from '../../services/TaskService';

const TaskDetails: React.FC = () => {
  const [task, setTask] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const fetchedTask = await getTaskDetails(parseInt(id));
        setTask(fetchedTask);
      } catch (error) {
        console.error('Fehler beim Laden der Aufgabendetails:', error);
      }
    };

    fetchTaskDetails();
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
      {/* Weitere Details und Aktionen hier */}
      <Link to={`/edit-task/${id}`}>Bearbeiten</Link>
    </div>
  );
};

export default TaskDetails;
