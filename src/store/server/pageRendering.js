import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { getFile } from './readBaseHtml';
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { loadState } from './loadState';
import { initOnServer } from '../shared/lib/settings';
import path from 'path';
import reducers from '../shared/reducers';


import * as api from '../../../config/theme/api/server';
import themeSettings from '../../../config/theme/themeSettings';
const languageTheme = 'en';

import App from '../shared/App';

const BASE_FILE_PATH = path.resolve('build/template.html');

initOnServer({
    api:  api.api,
    apiAjax: api.apiAjax,
    language: languageTheme,
    themeSettings: themeSettings
});


const getAppHtml = (store, location, context={}) => {
    
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
            <App />
        </StaticRouter>
      </Provider>
    );

    return html;
};

const renderPage = async (req, res, store, textLocales) => {
    
    const appHtml = getAppHtml(store, req.url);
    const state = store.getState();
    const text = textLocales;
    const indexHtml = await getFile(BASE_FILE_PATH);

    const html = indexHtml
         .replace('{app_state}', JSON.stringify(state))
         .replace('{app_text}', JSON.stringify(textLocales))
         .replace('{app}', appHtml);
    
    res.send(html);
}


const pageRendering = async (req, res) => {
    
   loadState(req, languageTheme).then( ({ state, textLocales }) => {
       
        initOnServer({
           text: textLocales,
        });

        const store = createStore(
         reducers,
         state,
         applyMiddleware(thunkMiddleware));
        
         renderPage(req, res, store, textLocales);
     })
}
   

export default pageRendering;