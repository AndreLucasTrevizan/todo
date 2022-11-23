import { ptBR } from 'date-fns/locale';
import { Schema, model } from 'mongoose';
import { format } from 'date-fns';
import { SerializedTodo, StatusTodo, TodoType } from '../../../types/todo';

const TodoSchema = new Schema<TodoType>({
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: StatusTodo,
    default: StatusTodo.IN_PROGRESS
  },
  date: {
    type: String,
    required: true,
    default: format(new Date(Date.now()), 'yyyy-MM-dd', { locale: ptBR }),
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
    status: this.status,
    user_id: this.user_id,
    date: this.date,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

export const Todo = model<TodoType>('Todo', TodoSchema);
