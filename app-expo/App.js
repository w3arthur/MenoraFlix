import React, { useState, useRef,  useEffect } from 'react';
import {StyleSheet, useWindowDimensions, View,ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import {   ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { Entypo, Fontisto, AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import 'react-native-gesture-handler';
import { NavigationContainer }  from '@react-navigation/native';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { MainPageContainer, PageContainer, Input } from './Components';
import {useGoBack, useGoTo, useNavigation} from './Hooks';
import {Login, Register, Logout, MyHome, Favorites} from './Pages';
import { ReduxProvider, useSelectorAuth , useSelectorMovies } from './reducers';


import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {

  const [isReady, setIsReady] = useState(true);
  let [isLoaded] = useFonts({
    'Daydreamer': require('./assets/fonts/Daydreamer.ttf'),   //for each new font: npx react-native link
  });

  useEffect(() => {
    const showSplashScreen = async () => { await SplashScreen.preventAutoHideAsync(); }
    (async() => {
      await showSplashScreen();
    })()
  }, []);

  useEffect(() => {
    const hideSplashScreen = async () => { await SplashScreen.hideAsync(); }
      if (isLoaded && isReady) hideSplashScreen();
  }, [isReady, isLoaded]);


return (<>
{isLoaded && isReady ?
<ReduxProvider>
  <MainPageContainer><NavigationContainer> 
      <StackNav />
    </NavigationContainer></MainPageContainer>
</ReduxProvider> : null}
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
  , tabBarIcon: ({ focused, color }) => (
    <Box style={{position: 'absolute', left: -5, top: -12}}>
      <Icon as={Entypo} name="home" size={10} color={color} />
    </Box>),
    }} />
  <Tab.Screen name={"Favorites"} component={Favorites} options={{ 
    tabBarLabel: <Text fontSize='xs' lineHeight={'xl'}>Favorites</Text>
    , tabBarIcon: ({ focused, color }) => (
      <Box style={{position: 'absolute', left: -5, top: -10}}>
        <Icon as={Fontisto} name="star" size={9} color={color} />
{favoriteStaredCounter() > 0 ?
        <Badge value={favoriteStaredCounter()} />: null

}

      </Box>),
    }} />
</Tab.Navigator></>);

function Badge({value}){
  return (<Box  bg="#F53930" rounded="full" mt={-8} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" style={{ minWidth: 20, minHeight: 20}} >
              <Text fontSize={'xs'} lineHeight={'xs'} >{value}</Text>
          </Box>)}


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


