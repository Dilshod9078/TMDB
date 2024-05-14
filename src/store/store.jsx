import { configureStore } from "@reduxjs/toolkit";
import getFilms from './films';

 export const store = configureStore({
    reducer: {
        films: getFilms
    }
})