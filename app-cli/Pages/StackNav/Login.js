
import React, { useState, useRef,  useEffect } from 'react';
import { useWindowDimensions, ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MainPageContainer, PageContainer, Input, Input2 } from '../../Components';
import {useGoBack, useGoTo, useNavigation} from '../../Hooks';
import backgroundImage  from '../../assets/background.png'
import { useAuthDispatch, useSelectorAuth } from '../../reducers';
import {useRoute} from '@react-navigation/native';
import { Axios } from '../../Api';

export default function Login(){

  const route = useRoute(); //route.params
  const { SetAuth }  = useAuthDispatch();
  const goTo = useGoTo();
  const nameRef = useRef();
  const passwordRef = useRef();
  const buttonRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const height = useWindowDimensions().height;
  useEffect(()=>{
    // checkAccessToken();
    (async() =>{
    await checkIfRegistered();
    await (async() =>{if(route.params){
      const {name, password} = route.params;
        await nameRef.current.setValue(name);
        await passwordRef.current.setValue(password);
    } })()
    })()
   // else nameRef.current?.focus();
  }, []);

const render = () => (<PageContainer index statusBar><ImageBackground source={backgroundImage} resizeMode="cover" style={{justifyContent: "space-around", flex: 1}} imageStyle={{ borderRadius: 12, minHeight: height - 24}}>
  <ScrollView style={{flex:1, padding: 20}}>
    <Heading style={{marginVertical: 30}} size={'3xl'}>Menora Flix</Heading>
    <Text style={{marginVertical: 7}} fontSize='3xl'>Login</Text>
    <Input ref={nameRef} onSubmit={() => passwordRef.current?.focus()}  label="username" />
    <Input ref={passwordRef} onSubmit={() => buttonRef.current?.focus()}  label="password" type="password" />
    <Button ref={buttonRef} onPress={ handlePressLogin } style={{marginTop: 35}}>Login</Button>
    <Box><Text>{errorMessage}</Text></Box>
    <Box><Text onPress={ handlePressRegister }>First time here?, <Text bold>Sign In</Text></Text></Box>
    <Box><Text>for interviewer: name: <Text bold>abc</Text> pass: <Text bold>123</Text>  </Text></Box>
  </ScrollView>
</ImageBackground></PageContainer>)


async function handlePressLogin(){
  const name = nameRef.current.getValue();
  const password = passwordRef.current.getValue();
  async function nameError(val){nameRef.current?.setError(val);}
  async function passwordError(val){passwordRef.current?.setError(val);}
  
  setErrorMessage('');
  await nameError('');
  await passwordError('');

  try{
      const data = {name: name, password: password};
      const result = await Axios('POST', '/api/login/', data, {});
      if(!result) throw 'Login fail!';
      try{ await AsyncStorage.setItem('@registered', 'true'); }catch(e){  }
      SetAuth(result);
  }catch(e){ 
    if (e.status === 472) nameError(e.data);
    else if (e.status === 461) passwordError(e.data);
    else setErrorMessage(e); 
  }
}

async function checkIfRegistered(){
  try{  
      const isRegistered = await AsyncStorage.getItem('@registered');
      
      if(!isRegistered) {
        await AsyncStorage.setItem('@registered', 'attempt');
        await (async() => goTo('Register'))();}
  }catch(e){  }
}

async function checkAccessToken(){
  try{
      const refreshToken = await AsyncStorage.getItem('@token');
      if(!refreshToken) return;
      const data = {token: refreshToken};
      const result = await Axios('PATCH', '/api/login/', data, {});
      if(!result) return;
      SetAuth(result);
  }catch(e){  }
}

function handlePressRegister(){
  const name = nameRef.current.getValue();
  const password = passwordRef.current.getValue();
  if(name === '' && password === '') goTo('Register');
  const data = {name: name, password: password};
  goTo('Register', data);
}


return render();}
