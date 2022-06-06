
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthDispatch ,useSelectorAuth, useMovieDispatch} from '../../../reducers'
import { Axios } from '../../../Api';
export default function Logout(){
    const { ResetAuth } = useAuthDispatch();
    const { ResetFavMovies } = useMovieDispatch();
    const {auth} = useSelectorAuth();
    useEffect(()=>{ 
        try{ (async()=>{ await Axios('DELETE', '/api/login/?token=', {}, {'authorization':  auth.refreshToken}); })() }catch(e){}
        try{ (async()=>{ await  AsyncStorage.removeItem('@token');} )() }catch(e){}
        (async()=>{
            await (async()=>{ResetAuth(); })();
            await (async()=>{ResetFavMovies(); })();
        })()
    }, [])
return (<></>);
}