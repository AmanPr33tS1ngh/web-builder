import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'grapesjs/dist/css/grapes.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './Components/Store/reducer';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate} from "redux-persist/integration/react";
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}><React.StrictMode>
      <PersistGate persistor={persistor}><App /></PersistGate>

  </React.StrictMode>
  </Provider>
);

reportWebVitals();
export default store;