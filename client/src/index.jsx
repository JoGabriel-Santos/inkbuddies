import React from "react";
import { createRoot } from 'react-dom/client';

import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';

import { reducers } from './reducers';

import "./styles/general.css";
import "./styles/queries.css";
import "./styles/style.css";

import App from "./App";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store={ store }><App/></Provider>
);