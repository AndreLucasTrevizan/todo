import { Schema } from 'mongoose';
import { SerializedUser } from '../auth';

export interface SerializedTodo {
  _id: Schema.Types.ObjectId;
  description: string;
  user_id: SerializedUser;
  createdAt: string;
  updatedAt: string;
}

export type TodoType = SerializedTodo & Document & {
  serialize(): SerializedTodo;
};
