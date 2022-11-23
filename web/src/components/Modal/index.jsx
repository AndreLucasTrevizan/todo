import React from 'react';
import { FiX } from 'react-icons/fi';

import './index.css';

export default function Modal({
  message,
  handleShowModal,
  mainAction
}) {
  return (
    <div className='modal'>
      <div className='modal_container'>
        <div className='modal_header'>
          <button className='close_button' onClick={() => handleShowModal()}><FiX /></button>
        </div>
        <div className='modal_body'>
          <span className='message'>{message}</span>
          <div className='modal_actions'>
            <button className='modal_ok_action' onClick={() => mainAction()}>Sim</button>
            <button className='modal_deny_action' onClick={() => handleShowModal()}>Não</button>
          </div>
        </div>
      </div>
    </div>
  )
}
