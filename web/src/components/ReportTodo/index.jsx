import React, { useContext, useState } from 'react';
import { addDays, format, subDays } from 'date-fns';
import { AuthContext } from '../../contexts/AuthContext';
import { useQuery } from 'react-query';
import Todo from '../todo';
import { api } from '../../service/api';
import Loader from '../Loader';

import './index.css';
import { ptBR } from 'date-fns/locale';

export default function ReportToDo() {
  const [date, setDate] = useState(new Date());
  const [filter, setFilter] = useState('in_progress');
  
  const {
    signed
  } = useContext(AuthContext);

  const handleNextDay = () => {
    let new_date = addDays(date, 1);
    setDate(new_date);
  };

  const handlePreviousDay = () => {
    let new_date = subDays(date, 1);
    setDate(new_date);
  };

  const headers = {
    Authorization: `Bearer ${signed.token}`,
  }

  const handleFetchTodos = async () => {
    const response = await api.get('/todos', {
      headers,
      params: {
        status: filter,
        createdAt: format(date, 'yyyy-MM-dd', { locale: ptBR })
      }
    });

    return response.data;
  }

  const {
    isLoading,
    isError,
    error,
    data,
  } = useQuery({
    queryKey: ['todos', date, filter],
    queryFn: handleFetchTodos
  });

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  }

  return (
    <div className='todo_list_report'>
      <div className='filter_date'>
        <button className='button' onClick={handlePreviousDay}>&lt;</button>
        <h1>{format(date, 'dd/MM/yyyy')}</h1>
        <button className='button' onClick={handleNextDay}>&gt;</button>
      </div>
      <div className='filter_status'>
        <div className='form_group_radio'>
          <label htmlFor='progress' className='form_label'>Em progresso</label>
          <input
            type="radio"
            name="status"
            id='progress'
            value={'in_progress'}
            checked={filter === 'in_progress'}
            onChange={(e) => handleChangeFilter(e)}
          />
        </div>
        <div className='form_group_radio'>
          <label htmlFor='done' className='form_label'>Feitas</label>
          <input
            type="radio"
            name="status"
            id='done'
            value={'done'}
            checked={filter === 'done'}
            onChange={(e) => handleChangeFilter(e)}
          />
        </div>
      </div>
      {isLoading && (
        <div className='loader_place'>
          <Loader />
        </div>
      )}
      {isError &&
        <div className='api_error'>
          <span>{error}</span>
        </div>
      }
      {!isLoading && (
        <>
          {data.map(todo => <Todo key={todo._id} data={todo} />)}
        </>
      )}
    </div>
  )
}
