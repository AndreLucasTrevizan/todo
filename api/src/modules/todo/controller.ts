import { Request, Response } from 'express';
import { StatusTodo } from '../../types/todo';
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

export const updateTodo = async (
  req: Request,
  res: Response
) => {
  try {
    const { _id } = req.params;
    const { description } = req.body;

    await Todo.findOneAndUpdate({
      _id,
      user_id: req.user._id,
    }, {
      $set: { description },
    });

    return res.json({ message: 'Updated' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const readyTodo = async (
  req: Request,
  res: Response
) => {
  try {
    await Todo.findOneAndUpdate({
      _id: req.params._id,
      user_id: req.user._id,
    }, { $set: { status: StatusTodo.DONE } });

    return res.json({ message: 'Todo Ready' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
) => {
  try {
    const { _id } = req.params;

    await Todo.findOneAndDelete({
      _id,
      user_id: req.user._id,
    });

    return res.json({ message: 'Deleted' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
