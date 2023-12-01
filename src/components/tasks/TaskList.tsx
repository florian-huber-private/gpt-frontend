import React, { useEffect, useState } from 'react';
import { getTasks } from '../../services/TaskService';
import { ITask } from '../../types/interfaces';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Fehler beim Laden der Aufgaben:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Aufgabenliste</h2>
      {tasks.map((task: any) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          {/* Weitere Aufgabendetails und Aktionen hier */}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
