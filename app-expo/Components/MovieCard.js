
import React, { useState, useRef,  useEffect } from 'react';
import { StatusBar, useWindowDimensions, Image as NativeImage,StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableOpacity  as NativeButton, TouchableHighlight as NativeButton2, View, Dimensions, Animated} from 'react-native';
import {ScrollView, AspectRatio , Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";


export default function MovieCard({movie}){
return (<Box style={{flexDirection: 'row', height: '100%'}}>
  <Box style={{flex: 1, margin: 7,}}><ImageBackground source={{ uri: movie.image }} resizeMode="contain" style={{justifyContent: "space-around", flex: 1}} imageStyle={{ borderRadius: 5}}></ImageBackground></Box>
  <Box style={{flex: 1, margin: 7, backgroundColor: '#272727', borderRadius: 5}}>
    <Center pt={4}><Text bold fontSize={'sm'} numberOfLines={3} ellipsizeMode={'tail'}>{movie.title}</Text></Center>
    <Box pb={2} pl={1} style={{flex: 1, justifyContent: 'center'}}>
      <Text numberOfLines={1} ellipsizeMode={'tail'}>Year: {movie.year}</Text>
      <Text numberOfLines={2} ellipsizeMode={'tail'}>imdbID: {movie.id}</Text>
      <Text numberOfLines={1} ellipsizeMode={'tail'}>Type: {movie.type}</Text>
    </Box>
  </Box>
</Box>);}