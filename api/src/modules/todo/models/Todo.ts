import { Schema, model } from 'mongoose';
import { SerializedTodo, TodoType } from '../../../types/todo';

const TodoSchema = new Schema<TodoType>({
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
}, { timestamps: true });

TodoSchema.methods.serialize = function(): SerializedTodo {
  return {
    _id: this._id,
    description: this.description,
    user_id: this.user_id,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

export const Todo = model<TodoType>('Todo', TodoSchema);
