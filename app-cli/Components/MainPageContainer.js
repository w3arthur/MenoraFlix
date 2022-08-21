
import React from 'react';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, StyleSheet } from 'react-native';
import { Text as NativeText, View,  KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import {  StatusBar, NativeBaseProvider, extendTheme  } from "native-base";
import {LinearGradient} from 'expo-linear-gradient';
import { globalTheme, globalStyles, globalStyleConfig } from './Theme';

export default function MainPageContainer({children}) {

const render = () => (<>


<SafeAreaView style={globalStyles.globalContainer}>
{/*<NativeText>© Arthur Zarankin</NativeText>*/}
<NativeBaseProvider theme={globalTheme} config={globalStyleConfig} >

{children}

</NativeBaseProvider>
{/*<NativeText style={styles.right}>© Arthur Zarankin</NativeText>*/}
</SafeAreaView>
</>);










return render();}




