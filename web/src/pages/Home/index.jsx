import React from 'react';
import CreateToDo from '../../components/CreateToDo';
import ReportToDo from '../../components/ReportTodo';

import './index.css';

export default function Home() {
  return (
    <div className='dashboard'>
      <div className='panel'>
        <CreateToDo />
        <ReportToDo />
      </div>
    </div>
  );
}
