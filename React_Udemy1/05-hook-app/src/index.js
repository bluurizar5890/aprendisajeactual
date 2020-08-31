import React from 'react';
import ReactDOM from 'react-dom';
import { SimpleForm } from './components/02-useEffect/SimpleForm';
//import { HooksApp } from './HooksApp';
// import { CounterApp } from './components/01-useState/CounterApp';
// import { CounterWithCustomHook } from './components/01-useState/CounterWithCustomHook';

ReactDOM.render(
  <React.StrictMode>
    <SimpleForm />
  </React.StrictMode>,
  document.getElementById('root')
);
