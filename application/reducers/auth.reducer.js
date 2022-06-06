import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = { auth: {} }

// Reducer
export const authReducer = createSlice({
    name: 'authReducer'
    , initialState: initialState
    , reducers: {
        SetAuth: (state, action) => {
            const {auth}= action.payload;
            try{(async() => { 
                const token = JSON.stringify(auth.refreshToken);
                 await AsyncStorage.setItem('@token', token);
            })(); }catch(e){};
            state.auth = auth;
        }
        , ResetAuth: (state, action) => {
             state.auth =  initialState.auth;
        }
    }
});

export const useSelectorAuth = () => useSelector(s=>s.authReducer);

export const useAuthDispatch = () => {
    const _dispatch = useDispatch();
    const {SetAuth, ResetAuth} = authReducer.actions;
    return ({
        SetAuth: (auth) => _dispatch(SetAuth({auth}))
        , ResetAuth: () =>  _dispatch(ResetAuth())
    })
};


export default authReducer.reducer;












/*
export default function weatherReducer(state = {result: {}, history: []}, action){
    console.log(state);
    switch(action.type)
    {
        case "ADD_RESULT":  
            const arr = JSON.parse(JSON.stringify(state.history));
            return {
                result: {...action.payload}
                , history: [{...action.payload}, ...arr]
            };
        case "RESET": return {result: {}, history: []};
        default: return state;
    }
}*/