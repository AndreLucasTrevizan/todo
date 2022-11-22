import React, { useState, useContext } from 'react';
import { format } from 'date-fns';
import { FiEdit, FiXSquare, FiSave, FiArrowRight } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';
import './index.css';

import ptBr from 'date-fns/locale/pt-BR';
import { api } from '../../service/api';
import { AuthContext } from '../../contexts/AuthContext';

export default function Todo({ data }) {
  const [updating, setUpdating] = useState(false);
  const [description, setDescription] = useState(data.description);

  const queryClient = useQueryClient();

  const isUpdating = () => {
    setUpdating(true);
  }

  const {
    signed
  } = useContext(AuthContext);

  const headers = {
    Authorization: `Bearer ${signed.token}`,
  }

  const handleDelete = (todo_id) => {
    return api.delete(`/todos/${todo_id}`, { headers });
  };

  const handleUpdate = (description) => {
    return api.patch(`/todos/${data._id}`, { description }, { headers });
  };

  const deleteMutation = useMutation(handleDelete);
  const updateMutation = useMutation(handleUpdate);

  const handleDeleteAndUpdate = () => {
    if (updating) {
      setUpdating(false);
      return;
    }

    deleteMutation.mutate(data._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      }
    });
  }

  const handleUpdateTodo = () => {
    updateMutation.mutate(description);
  };

  return (
    <div className='todo'>
      <div className='todo_info'>
        {updating &&
          <input
            type="text"
            className='form_input'
            value={data.description}
            style={{ marginBottom: '3px' }}
            onChange={(e) => setDescription(e.target.value)}
          />
        }
        {description === '' && <span className='field_error_message'>A descrição é obrigatória</span>}
        {!updating && <span className='description'>{data.description}</span>}
        <span className='time'>{
          format(
            new Date(data.createdAt),
            'PPp',
            { locale: ptBr }
          )
        }</span>
      </div>
      <div className='todo_options'>
        {updating && <button className='save_button'>
          <FiSave />
        </button>}
        {!updating && <button className='edit_button' onClick={isUpdating}>
          <FiEdit />
        </button>}
        <button className='delete_button' onClick={handleDeleteAndUpdate}>
          {updating && <FiArrowRight />}
          {!updating && <FiXSquare />}
        </button>
      </div>
    </div>
  )
}
