import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import reducers from '../shared/reducers';
import { initOnClient } from '../shared/lib/settings';

import * as api from '../../../config/theme/api/client';
import themeSettings from '../../../config/theme/themeSettings';
const languageTheme = 'en';

const initialState = window.__APP_STATE__;
const themeText = window.__APP_TEXT__;

initOnClient({
	themeSettings: themeSettings,
  language: languageTheme,
  text: themeText,
  api: api.api,
  apiAjax: api.api
});

import App from '../shared/App';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);


ReactDOM.hydrate(

<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>, 
document.querySelector("#index")
);