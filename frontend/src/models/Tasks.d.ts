declare module '@/models/Tasks' {
	import { ObjectId } from 'mongoose';

	export interface Task {
		_id: string; 
		userId: string | ObjectId;
		title: string;
		description: string;
		statusId: number;
		status: string;
		labels: Array<string | ObjectId>;
		dueDate?: string | string[];
		createdAt: string | Date;
		updatedAt: string | Date;
	}


	export function getAllTasks(): Promise<Task[]>;
}
