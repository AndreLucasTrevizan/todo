import { Request, Response } from 'express';
import { Todo } from './models/Todo';

export const creatingTodo = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      description,
    } = req.body;

    const todo = await Todo.create({
      description,
      user_id: req.user._id,
    });

    return res.status(201).json({ _id: todo._id });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const listTodo = async (
  req: Request,
  res: Response
) => {
  try {
    const { createdAt, status } = req.query;

    const list_todo = await Todo.find({
      user_id: req.user._id,
      status,
      date: createdAt
    });

    return res.json(list_todo.map(todo => todo.serialize()));
  } catch (error) {
    return res.status(500).json({ error });
  }
};
