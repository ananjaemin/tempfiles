import React from 'react';
import { Global } from '@emotion/react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { globalStyle } from './styles';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Global styles={globalStyle} />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
