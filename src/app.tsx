import ReactDOM from 'react-dom/client';
import React from 'react';
import { Game } from './game/Game';

const root = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
);
