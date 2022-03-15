import React from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { StoresProvider } from './StoresProvider';
import App from './App';
import './index.css';

dayjs.extend(calendar);
dayjs().calendar(null, {
  sameDay: 'h:mm', // The same day ( Today at 2:30 AM )
  lastDay: '[Yesterday]', // The day before ( Yesterday at 2:30 AM )
  lastWeek: 'dddd', // Last week ( Last Monday at 2:30 AM )
  sameElse: 'DD/MM/YYYY', // Everything else ( 7/10/2011 )
});

ReactDOM.render(
  <React.StrictMode>
    <StoresProvider>
      <App />
    </StoresProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
