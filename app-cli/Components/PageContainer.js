
import React, { useState, useRef,  useEffect } from 'react';
import { View ,Text as NativeText, KeyboardAvoidingView} from 'react-native';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import {  StatusBar, NativeBaseProvider, extendTheme  } from "native-base";
import { PageContainerStyle } from './Theme';


export default function PageContainer({children, index, statusBar, topCorners}) {
return(<>
<SafeAreaView style={PageContainerStyle.preContainer}><KeyboardAvoidingView 
style={[index ? PageContainerStyle.containerIndex :  PageContainerStyle.containerRegular, topCorners? PageContainerStyle.containerTopRadius : null]}>
    {statusBar? <StatusBar style="auto" backgroundColor={'#E40412'} />: null}
    {children}
</KeyboardAvoidingView></SafeAreaView>
</>);
}


