
import React, { useState, useRef,  useEffect } from 'react';
import { useWindowDimensions, ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import {useRoute} from '@react-navigation/native';
import { MainPageContainer, PageContainer, Input } from '../../Components';
import {useGoBack, useGoTo, useNavigation} from '../../Hooks';
import backgroundImage  from '../../assets/background.png'
import { useAuthDispatch, useSelectorAuth } from '../../reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Axios } from '../../Api';

export default function Register(){
  const route = useRoute(); //route.params
  const goTo = useGoTo();
  const nameRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();
  const buttonRef = useRef();
  const [errorMessage, setErrorMessage] = useState();
  const height = useWindowDimensions().height;
  useEffect(() => {
    if(route.params){
      const {name, password} = route.params;
      (async() =>{
        await nameRef.current.setValue(name);
        await passwordRef.current.setValue(password);
      })()
    } //else nameRef.current?.focus();
  }, [])

const render = () => (<PageContainer index statusBar><ImageBackground source={backgroundImage} resizeMode="cover" style={{justifyContent: "space-around", flex: 1}} imageStyle={{ borderRadius: 12, minHeight: height - 24 }}>
    <ScrollView style={{flex:1, padding: 20}}>
      <Heading style={{marginVertical: 30}} size={'3xl'}>Menora Flix</Heading>
      <Text style={{marginVertical: 7}} fontSize='3xl'>Register</Text>
      <Input ref={nameRef} label="username" onSubmit={() => passwordRef.current?.focus()} />
      <Input ref={passwordRef} label="password" type="password" onSubmit={() => password2Ref.current?.focus()} />
      <Input ref={password2Ref} label="password approve" type="password" onSubmit={() => buttonRef.current?.focus()} />
      <Button ref={buttonRef} onPress={ handlePressRegister } style={{marginTop: 35}}>Sign In</Button>
      <Box><Text>{errorMessage}</Text></Box>
      <Box><Text onPress={ handlePressLogin }>Having a user?, <Text bold>Login</Text></Text></Box>
  </ScrollView>
</ImageBackground></PageContainer>)

async function handlePressRegister(){
  const name = nameRef.current.getValue();
  const password = passwordRef.current.getValue();
  const password2 = password2Ref.current.getValue();
  async function nameError(val){nameRef.current?.setError(val);}
  async function passwordError(val){passwordRef.current?.setError(val);}
  async function password2Error(val){password2Ref.current?.setError(val);}

  setErrorMessage('');
  await nameError('');
  await passwordError('');
  await password2Error('');

  if(password !== password2){password2Ref.current?.setError('passwords not match');return;}

  try{
      const data = {name: name, password: password};
      const result = await Axios('POST', '/api/login/register', data, {});
      if(!result) throw 'Registration fail!';
      try{ await AsyncStorage.setItem('@registered', 'true'); }catch(e){  }
      goTo('Login', data);
  }catch(e){ 
    if (e.status === 472) nameError(e.data);
    else if (e.status === 461) passwordError(e.data);
    else setErrorMessage(e); 
  }
}


function handlePressLogin(){
  const name = nameRef.current.getValue();
  const password = passwordRef.current.getValue();
  if(name === '' && password === '') goTo('Login');
  const data = {name: name, password: password};
  goTo('Login', data);
}


return render();}



  /* *  previous validator
  const patternName = /^[A-Za-z]{8,}$/;
  const patternPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
  if(name === ''){await nameError('no username set');return;}
  if(name.length <= 8){await nameError('must contain at least 8 chars');return;}
  if(!patternName.test(name)){await nameError('must contain only letters');return;}
  if(password === ''){await passwordError('no password set');return;}
  if(password.length <= 6){await passwordError('must contain at least 6 chars');return;}
  if(!patternPassword.test(password)){await passwordError('must contain 1 special char, 1number');return;}
  /* */