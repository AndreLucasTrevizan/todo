import React, { useContext } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from 'react-query';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../service/api';
import Loader from '../Loader';

export default function CreateToDo() {

  const queryClient = useQueryClient();

  const {
    signed
  } = useContext(AuthContext);

  const headers = {
    Authorization: `Bearer ${signed.token}`,
  }

  const schema = yup.object().shape({
    description: yup.string().required('A descrição é obrigatória'),
  });

  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCreateTodo = ({ description }) => {
    return api.post('/todos', { description }, { headers });
  }

  const mutation = useMutation(handleCreateTodo);

  const handleCALLApi = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        reset();
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      },
      onError: () => {
        reset();
      },
    });
  };

  return (
    <div className='todo_list_today'>
      <h1>{mutation.isLoading ? 'Criando To do' : 'Criar Novo To do'}</h1>
      {mutation.isLoading ? (
        <Loader />
      ) : (
        <form className='form' onSubmit={handleSubmit(handleCALLApi)}>
          <label className='form_label'>Descrição</label>
          <input
            autoComplete='false'
            type="text"
            className='form_input'
            placeholder='Fazer compras'
            {...register('description')}
          />
          {errors.description && <span className='field_error_message'>{errors.description.message}</span>}
          <button className='button' style={{ width: 'max-content' }}>Criar To do</button>
        </form>
      )}
    </div>
  )
}
