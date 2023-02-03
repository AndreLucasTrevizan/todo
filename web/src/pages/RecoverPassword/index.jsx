import Loader from '../../components/Loader';
import '../Login/index.css';
import './index.css';

export const RecoverPassword = () => {
  return (
    <div className='login_page'>
      <form className='form'>
        <div className='form_header'>Recuperando Senha</div>
        <div className='form_body'>
          <span>Informe o email cadastrado na sua conta</span>
          <div className='form_group'>
            <label className='form_label'>Email</label>
            <input
              type="email"
              placeholder='email@example.com'
              className='form_input'
            />
          </div>
          <button className='button'>Enviar Código</button>
        </div>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}
        >
          <Loader />
        </div>
      </form>
    </div>
  );
};