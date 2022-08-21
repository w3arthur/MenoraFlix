
import React, { useState, useRef,  useEffect } from 'react';
import { useWindowDimensions, ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import { StatusBar, ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";

import { MainPageContainer, PageContainer, Input, MovieCard } from '../../../../Components';
import {useGoBack, useGoTo, useNavigation} from '../../../../Hooks';
import { useAuthDispatch, useSelectorAuth, useSelectorMovies, useMovieDispatch, } from '../../../../reducers';

import { useIsFocused, useFocusEffect } from '@react-navigation/native';

export default function Favorites({navigation}){

    const isFocused = useIsFocused();
    const {favorites} = useSelectorMovies()
    const { ClearStarsFavMovies } = useMovieDispatch();
    const WINDOW_HEIGHT = useWindowDimensions().height;

    useEffect(() => {
    return navigation.addListener('focus', () => {
        ClearStarsFavMovies();
    });
    }, [navigation]);


const render = () => (<>
<PageContainer topCorners>
    <Box><Text>Favorites</Text></Box>
    <ScrollView contentContainerStyle={{minHeight: WINDOW_HEIGHT*0.84}}>
        <StatusBar style="auto" backgroundColor={isFocused ? '#E40412': null} />
            <Box style={{flex: 1}}>
                <Box style={{flex: 1, padding: 2}}>{
                    !favorites ? 'Empty' :
                    favorites.map((movie) =>
                        <Box key={movie.id} style={{ height: (WINDOW_HEIGHT*0.84)/ 2.40  ,minHeight: 220}}>
                            <Box><Text numberOfLines={1}>{movie.title}</Text></Box>
                            <Box style={{flex: 1 ,maxHeight: '90%'}}><MovieCard movie={movie}/></Box>
                        </Box>
                    )
                }
            </Box>
        </Box>
    </ScrollView>
</PageContainer>
</>)
return render();}