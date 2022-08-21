
import React, { useState, useRef,  useEffect } from 'react';
import {StyleSheet, useWindowDimensions, View,ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import {   ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

import 'react-native-gesture-handler';
import { NavigationContainer }  from '@react-navigation/native';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { MainPageContainer, PageContainer, Input } from './Components';
import {useGoBack, useGoTo, useNavigation} from './Hooks';
import {Login, Register, Logout, MyHome, Favorites} from './Pages';
import { ReduxProvider, useSelectorAuth , useSelectorMovies } from './reducers';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {

return (<>
<ReduxProvider>
  <MainPageContainer><NavigationContainer> 
      <StackNav />
    </NavigationContainer></MainPageContainer>
</ReduxProvider>
</>);}


function StackNav() {
  const { auth } = useSelectorAuth();
const render = () => (<>
  { auth?.name ? <DrawerNav /> :
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' options={{ }}  component={Login}/>
      <Stack.Screen name='Register' options={{ }}  component={Register}/>
    </Stack.Navigator>
  }
</>);
return render();}
  


function  DrawerNav() {
  const goTo = useGoTo();
  const height = useWindowDimensions().height;
const render = () => (<>
    <Drawer.Navigator drawerContent={() => <DrawerNavSideMenu />}  screenOptions={{ drawerStyle: { backgroundColor: '#010101', width: '100%' }, headerShown: false, drawerContentStyle: { backgroundColor: '#010101'} }} initialRouteName="MyHome" swipeEnabled={false} swipeEdgeWidth={false}  swipeMinDistance overlayColor={1} >
      <Drawer.Screen name="TabNav" options={{ drawerLabel: () => null, drawerIcon: () => null, title: null}}  component={TabNav} />
      <Drawer.Screen name="Logout" options={{ drawerLabel: () => (<Button >Logout</Button>),title: 'Logout'}}  component={Logout} />
    </Drawer.Navigator>
</>);



function DrawerNavSideMenu({style ,...props}){
return (<>
<DrawerContentScrollView {...props} style={{backgroundColor: '#010101', padding: 4, flex: 1,  ...style}}>
<Box style={{minHeight: height*0.9,    flex: 1,}}>
  <Box style={{flex: 1}}></Box>
  <Box> <Button onPress={()=>{goTo('Logout')}}>Logout</Button> </Box>
</Box>
  </DrawerContentScrollView>
</>);
}

return render();}



function TabNav() {
  const {favorites} = useSelectorMovies();
  function favoriteStaredCounter(){
    const filter = favorites?.filter(x => x.stared === true);
    return filter?.length || 0;
  }


const render = () => (<><Tab.Navigator initialRouteName={"MyHome"} activeColor="#d1d1d1" inactiveColor="#ffffff" barStyle={{ backgroundColor: '#010101', padding: 4}}>
  <Tab.Screen name={"StackNav2"} component={StackNav2} options={{ 
    tabBarLabel: <Text fontSize='xs' lineHeight={'xl'}>My Home</Text>
  , tabBarIcon: ({ focused, color }) => (<Box style={{position: 'absolute', left: -9, top: -13}}><Entypo name="home" size={42} color={color} style={{width: 40, height: 40}} /></Box>),
    }} />
  <Tab.Screen name={"Favorites"} component={Favorites} options={{ 
    tabBarLabel: <Text fontSize='xs' lineHeight={'xl'}>Favorites</Text>
    , tabBarIcon: ({ focused, color }) => (
      <Box style={{position: 'absolute', left: -7, top: -9}}>
        <Fontisto name="star" size={36} color={color} style={{width: 40, height: 40}} />
        {favoriteStaredCounter() > 0 ? <Badge value={favoriteStaredCounter()} />: null }
      </Box>),
    }} />
</Tab.Navigator></>);

function Badge({value}){
  return (<Box  bg="#F53930" rounded="full" mt={-10} mr={-2} zIndex={1} variant="solid" alignSelf="flex-end" style={{ minWidth: 20, minHeight: 20}} ><Text fontSize={'xs'} lineHeight={'xs'} >{value}</Text></Box>)}


return render();}


function StackNav2() {
const render = () => (<>
<Stack.Navigator  screenOptions={{ ...headerGlobalStyle }}>
  <Stack.Screen name='MyHome'  options={{ headerTitle: ()=> <Text fontSize={'md'}>My Home</Text>, ...headerStyle /*header: () =>(<></>),*/}}  component={MyHome}/>
</Stack.Navigator>
</>);
const headerGlobalStyle = {
  headerStyle: { backgroundColor: '#E40412'}
  , headerTintColor: '#E1E1E1'
  , headerTitleAlign: "center"
  , headerTitleStyle: { fontWeight: 'bold' }
 // , headerRight: () => (<Button onPress={() => alert('Created by Arthur Zarankin!')}>Info</Button>)
 // , headerShown: true
}
const headerStyle = { 
  
}

return render();}
