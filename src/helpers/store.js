// import { createStore, applyMiddleware } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux';
import React, {LoadState} from 'react';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger();


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancer(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__|| compose
);