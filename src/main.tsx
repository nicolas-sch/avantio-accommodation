import React from 'react';
import ReactDOM from 'react-dom/client';
import reactToWebComponent from 'react-to-webcomponent';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import './index.css';

const CustomReactForm = reactToWebComponent(App, React, ReactDOM);

customElements.define('custom-react-form', CustomReactForm);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);