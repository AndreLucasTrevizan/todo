import { Schema } from 'mongoose';
import { SerializedUser } from '../auth';

export enum StatusTodo {
  IN_PROGRESS = 'in_progress',
  DONE = 'done'
}
export interface SerializedTodo {
  _id: Schema.Types.ObjectId;
  description: string;
  status: StatusTodo;
  user_id: SerializedUser;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export type TodoType = SerializedTodo & Document & {
  serialize(): SerializedTodo;
};
