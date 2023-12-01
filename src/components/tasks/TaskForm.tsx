import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createTask, getTaskDetails, updateTask } from '../../services/TaskService';

const TaskForm: React.FC = () => {
  const [task, setTask] = useState({ title: '', description: '', priority: 'LOW' });
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateTask(parseInt(id), task);
      } else {
        await createTask(task);
      }
      navigate('/tasks');
    } catch (error) {
      console.error('Fehler beim Speichern der Aufgabe:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Aufgabe bearbeiten' : 'Neue Aufgabe erstellen'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titel:</label>
          <input 
            type="text" 
            name="title" 
            value={task.title} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Beschreibung:</label>
          <textarea 
            name="description" 
            value={task.description} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Priorität:</label>
          <select name="priority" value={task.priority} onChange={handleChange}>
            <option value="LOW">Niedrig</option>
            <option value="MEDIUM">Mittel</option>
            <option value="HIGH">Hoch</option>
          </select>
        </div>
        <button type="submit">Speichern</button>
      </form>
    </div>
  );
};

export default TaskForm;
