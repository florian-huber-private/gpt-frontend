export interface IUser {
  id: number;
  username: string;
  email: string;
}

// Bei Bedarf können Sie auch AuthResponse anpassen, um dem Backend zu entsprechen
export interface AuthResponse {
  token: string;
  user: IUser;
}

export enum TaskStatus {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export enum TaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export interface ITask {
  id: number;
  user_id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  category_id?: number;
  creation_date: string;
  due_date?: string;
  status: TaskStatus;
}

export interface ICategory {
  id: number;
  name: string;
}
