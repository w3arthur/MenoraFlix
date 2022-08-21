
import React from 'react';
import {Provider} from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import authReducer, {useSelectorAuth, useAuthDispatch } from './auth.reducer';
import movieReducer, {useSelectorMovies, useMovieDispatch } from './movie.reducer';

const store = configureStore({
    reducer: {
        authReducer: authReducer
        , movieReducer: movieReducer   
    }
})

const ReduxProvider = ({children}) =>
     <Provider store={store}>{children}</Provider>

export {ReduxProvider, useSelectorAuth, useAuthDispatch, useSelectorMovies, useMovieDispatch}
