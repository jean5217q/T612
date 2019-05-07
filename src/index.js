import style from './style/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App'
import Main_Reducer from './reducer/main';
import { Provider } from 'react-redux'; //binding layer
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'
i18n.use(locale);

const store = createStore(
  Main_Reducer,
  applyMiddleware(thunk),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

