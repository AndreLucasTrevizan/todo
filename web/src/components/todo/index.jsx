import React, { useState, useContext } from 'react';
import { format } from 'date-fns';
import { FiEdit, FiXSquare, FiSave, FiArrowRight, FiCheck } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';
import './index.css';

import ptBr from 'date-fns/locale/pt-BR';
import { api } from '../../service/api';
import { AuthContext } from '../../contexts/AuthContext';
import Modal from '../Modal';

export default function Todo({ data }) {
  const [updating, setUpdating] = useState(false);
  const [description, setDescription] = useState(data.description);
  const [visibleModal, setVisibleModal] = useState(false);
  const [ready, setReady] = useState(false);

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

  const handleReady = (todo_id) => {
    return api.patch(`/todos/${todo_id}/ready`, {}, { headers });
  };

  const deleteMutation = useMutation(handleDelete);
  const updateMutation = useMutation(handleUpdate);
  const readyMutation = useMutation(handleReady);

  const handleDeleteTodo = () => {
    deleteMutation.mutate(data._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      },
      onError: (err) => {
        alert(err);
      }
    });
  }

  const handleUpdateTodo = () => {
    updateMutation.mutate(description, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
        setUpdating(false);
      }
    });
  };

  const handleShowModal = () => {
    setVisibleModal(prev => prev ? false : true);
  }

  const handleReadyTodo = () => {
    setReady(prev => prev ? false : true);
  }

  const handleChangeToReady = () => {
    readyMutation.mutate(data._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
      },
      onError: () => {
        setReady(false);
      }
    });
  }

  return (
    <div className='todo'>
      {visibleModal &&
        <Modal
          message={'Deseja mesmo excluir?'}
          handleShowModal={handleShowModal}
          mainAction={handleDeleteTodo}
        />
      }
      <div className='todo_info'>
        {data.status !== 'done' && <input type="checkbox" checked={ready} onChange={handleReadyTodo} />}
        <div className='info'>
          {updating &&
            <input
              type="text"
              className='form_input'
              value={description}
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
      </div>
      <div className='todo_options'>
        {(ready && data.status !== 'done') && (
          <div className='ready'>
            <span>Pronta?</span>
            <button className='ready_button' onClick={() => handleChangeToReady()}><FiCheck /></button>
          </div>
        )}
        {updating && <button className='save_button' onClick={handleUpdateTodo}>
          <FiSave />
        </button>}
        {(!updating && !ready && data.status !== 'done') && <button className='edit_button' onClick={isUpdating}>
          <FiEdit />
        </button>}
        {(!updating && !ready && data.status !== 'done') && <button className='delete_button' onClick={handleShowModal}>
          <FiXSquare />
        </button>}
        {updating && <button className='delete_button' onClick={() => setUpdating(false)}>
          <FiArrowRight />
        </button>}
      </div>
    </div>
  )
}
