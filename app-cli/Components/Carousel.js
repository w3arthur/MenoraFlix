
import React, { useState, useRef,  useEffect } from 'react';
import { StatusBar, useWindowDimensions, Image as NativeImage,StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableOpacity  as NativeButton, TouchableHighlight as NativeButton2, View, Dimensions, Animated} from 'react-native';
import {ScrollView, AspectRatio , Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { useIsFocused } from '@react-navigation/native';

const WINDOW_WIDTH = Dimensions.get("window").width > 450 ? 450 : Dimensions.get("window").width;
const CONTAINER_WIDTH = WINDOW_WIDTH /3.15;
const CORNER_DISTANCE = 15;//(width - CONTAINER_WIDTH) * 0.25;
const TOP_SPACE = 2;

export default function Carousel({additionalBox, data, onPress, ...props}) {
  const imageSizes = {minWidth: 115, minHeight: 125}
  const styles = StyleSheet.create({posterImage: { ...imageSizes,  resizeMode: "cover", width: 'auto', height: '100%', ...(additionalBox? {borderRadius : 2} : {borderTopRightRadius: 2, borderTopLeftRadius: 2} ) }, });

  const scrollX = useRef(new Animated.Value(0)).current;

return (<Animated.FlatList
  data={data} keyExtractor={(item) => item.id} 
  showsHorizontalScrollIndicator={false} horizontal={true} snapToAlignment="start" contentContainerStyle={{  paddingHorizontal: CORNER_DISTANCE }} snapToInterval={CONTAINER_WIDTH} decelerationRate={0} scrollEventThrottle={16}
  onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
  renderItem={({ item, index }) => { 
    const inputRange = [ (index - 20) * CONTAINER_WIDTH, index * CONTAINER_WIDTH, (index + 15) * CONTAINER_WIDTH,]; const scrollY = scrollX.interpolate({ inputRange, outputRange: [50, 0, 50],});
    return (<Box style={{ width: CONTAINER_WIDTH }}>
        <Animated.View style={{ marginHorizontal: TOP_SPACE, padding: TOP_SPACE, alignItems: "center",transform: [{translateY: scrollY}]}}>
          <Box style={[{ ...imageSizes }, {width: 'auto', height: '100%', zIndex: 5, flexDirection: 'column'}]} > 
            <NativeButton onPress={() => {onPress ? onPress(item): null} }><Image resizeMode='cover' alt={item.title || 'Movie'} {...props}  source={{ uri: item.image }} 
              style={[styles.posterImage,  additionalBox? {minHeight: '80%', height: 'auto'} : {height: '100%', flex: 1} ]} /></NativeButton>
            {additionalBox ?  additionalBox(item): null}  
 
          </Box>
        </Animated.View>
      </Box>);
  }} />);
}