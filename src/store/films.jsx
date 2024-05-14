import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    films: []
}
const getFilms = createSlice({
    name: "Films",
    initialState:initialState,
    reducers:{
        getNowplaying(state, action){
            return {
                films:[...action.payload]
            }
        }
    }
})

export const {getNowplaying} = getFilms.actions;
export default getFilms.reducer;