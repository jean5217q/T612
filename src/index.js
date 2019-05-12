import style from './style/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App'
import Main_Reducer from './reducer/main';
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
  Main_Reducer,
  applyMiddleware(thunk),
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

