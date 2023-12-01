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
	TODO = 'TODO',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED',
}

export enum TaskPriority {
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH',
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
