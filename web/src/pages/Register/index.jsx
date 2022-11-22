import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import Loader from '../../components/Loader';
import { handleRegister } from '../../service/api';
import { useMutation } from 'react-query';
import '../Login/index.css';

export default function Register() {
  const schema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório').min(4, 'Nome é muito curto'),
    email: yup.string().required('Email é obrigatório').email('Informe um email válido'),
    password: yup.string().required('Senha é obrigatória').min(8, 'Senha é muito curta')
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const mutation = useMutation(handleRegister, {
    onError: () => {
      reset();
      setTimeout(() => {
        mutation.reset();
      }, 5000);
    }
  });

  const handleAPICall = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className='login_page'>
      {mutation.isSuccess && <Redirect to={'/'} />}
      {mutation.isLoading ? <Loader /> : (
        <form className='form' onSubmit={handleSubmit(handleAPICall)}>
          <div className='form_header'>Criando Conta</div>
          <div className='form_body'>
            <div className='form_group'>
              <label className='form_label'>Nome</label>
              <input
                type="text"
                placeholder='John Cenna'
                className='form_input'
                {...register('name')}
              />
              {errors.name && <span className='field_error_message'>{errors.name.message}</span>}
            </div>
            <div className='form_group'>
              <label className='form_label'>Email</label>
              <input
                type="email"
                placeholder='email@example.com'
                className='form_input'
                {...register('email')}
              />
              {errors.email && <span className='field_error_message'>{errors.email.message}</span>}
            </div>
            <div className='form_group'>
              <label className='form_label'>Senha</label>
              <input
                type="password"
                placeholder='*********'
                className='form_input'
                {...register('password')}
              />
              {errors.password && <span className='field_error_message'>{errors.password.message}</span>}
            </div>
            <div className='form_group'>
              <button>Criar Conta</button>
            </div>
            {mutation.isError &&
              <div className='api_error'>
                <span>{mutation.error.response.data.message}</span>
              </div>
            }
            <div className='form_options'>
              <span>Já possui uma conta?</span>
              <Link to='/'>Fazer Login</Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}