import axios from 'axios';
import { server } from '../Config';

const axiosBaseUrl = server.AXIOS_BASE_URL;

const axiosFunction = axios.create({
    baseURL: axiosBaseUrl
    , headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': true}
    // , withCredentials: true
    , timeout: 0
});

export default async function Axios(method, additionUrl, data, additionHeader){
    try{
         console.log(axiosBaseUrl)
        let response = await axiosFunction({
            method: method
            , url: additionUrl
            , data: data !== undefined && Object.keys(data).length !== 0 ? JSON.stringify(data) : undefined //ios fix  (es5 support for empty object test) 
            , headers: additionHeader
        });
        console.log(':: axios success');
               
        return response.data;
    }catch(error){
        console.log(':: axios error (' + process.env.NODE_ENV + ')' );
        if(!error.response?.data) throw 'no server connection' ;
        if(Number(error.response?.status) > 460)  throw error.response; //modified errors
        throw error.response?.data;
    }
}



  