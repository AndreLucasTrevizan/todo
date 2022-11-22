import React, { useContext } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import './index.css';
import { useMutation } from 'react-query';
import { handleLogin } from '../../service/api';
import { AuthContext } from '../../contexts/AuthContext';

export default function Login() {

  const {
    setSigned,
  } = useContext(AuthContext);

  const schema = yup.object().shape({
    email: yup.string().required('Email é obrigatório').email('Informe um email válido'),
    password: yup.string().required('Senha é obrigatória').min(8, 'Senha muito curta')
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const mutation = useMutation(handleLogin, {
    onSuccess: ({ data }) => {
      setSigned(data);
      localStorage.setItem('signed', JSON.stringify(data));
    },
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
      {mutation.isLoading ? <Loader /> : (
        <form className='form' onSubmit={handleSubmit(handleAPICall)}>
          <div className='form_header'>Login</div>
          <div className='form_body'>
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
              <button>Entrar</button>
            </div>
            {mutation.isError &&
              <div className='api_error'>
                <span>{mutation.error.response.data.message}</span>
              </div>
            }
            <div className='form_options'>
              <span>Ainda não possui uma conta?</span>
              <Link to='/register'>Criar conta</Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}