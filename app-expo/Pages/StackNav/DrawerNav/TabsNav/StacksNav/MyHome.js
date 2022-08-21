
import React, { useState, useRef,  useEffect } from 'react';
import { StatusBar, useWindowDimensions, Image as NativeImage,StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableOpacity  as NativeButton, TouchableHighlight as NativeButton2, View, Dimensions, Animated} from 'react-native';
import {ScrollView, AspectRatio , Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { MainPageContainer, PageContainer, Input, Input2, Carousel, MovieCard } from '../../../../../Components';
import {useGoBack, useGoTo, useNavigation} from '../../../../../Hooks';
import { useAuthDispatch, useSelectorAuth, useSelectorMovies, useMovieDispatch } from '../../../../../reducers';
import { Axios, debounce } from '../../../../../Api';


//const WINDOW_HEIGHT = Dimensions.get("window").height;

export default function MyHome({ navigation }){
    const WINDOW_HEIGHT = useWindowDimensions().height;
    const {auth} = useSelectorAuth();
    const { AddRemoveFavorite, SetFavorites } = useMovieDispatch();
    const {favorites} = useSelectorMovies();
    const [selectedMovie, setSelectedMovie] = useState({id:null, title: null, image: null, type: null, year: null});
    const [topMovies, setTopMovies] = useState([]);
    const [newMovies, setNewMovies] = useState([]);

    const isFocused = useIsFocused();

    const searchRef = useRef();
    const [isSearch, setIsSearch] = useState(false);


    useEffect(()=>{
      try{
        (async() => {
            try{
              const movieList = await Axios('GET', '/api/favorites/', {}, {'authorization':  auth.accessToken});
              if(movieList) await (async() => SetFavorites(movieList))();
            }catch(e){
              try{
                const movieList = await AsyncStorage.getItem('@'+auth.name);
                if(movieList){ SetFavorites(JSON.parse(movieList)); }
              }catch(e){}
            }
            await handleSetNewMovies();
            await handleSetTopMovies();
        })()
      }catch(e){ alert(e); }
    }, []);


const render = () => (<>
<PageContainer> 
  <ScrollView contentContainerStyle={{/*flex:1,*/ minHeight: WINDOW_HEIGHT*0.825}}>
    <StatusBar style="auto" backgroundColor={isFocused ? '#010101' : null} />
    <Input2 ref={searchRef} onChangeText={handleSearchDelay} leftIcon={<NativeButton2 onPress={async() => await handleRestart()}><Icon as={MaterialCommunityIcons} name="restart" size="lg" /></NativeButton2>} />
    <Box style={{  flex: 1, display: 'flex', flexDirection: 'column', minHeight: WINDOW_HEIGHT*0.825}}> 

      <Box style={{  flex: 2.1, paddingTop: 15, minHeight: 190 }}>
        {!isSearch ? <Text lineHeight={'xs'} >Recommended Movies</Text> : null}
        <Carousel data={topMovies} onPress={(movie) => { handleSetSelectedMovie(movie) }} 
          additionalBox={ (movie) => (<NativeButton2 onPress={() => {  handleStarPress(movie) }}><Center  style={{minHeight: 30, backgroundColor: '#2D2D2D', minHeight: 26,borderTopWidth: 1, borderColor: '#2F2F2F', borderBottomRightRadius: 2, borderBottomLeftRadius: 2}}><Icon as={Entypo} name="star" size={6} color={ favorites?.find(x => x.id === movie.id)? '#E40412' : '#f1f1f1' } /></Center></NativeButton2>) }
        />
      </Box>

      <Box style={{ flex: 4, paddingTop: 10, paddingBottom:10, minHeight: 260}}>
              <Text lineHeight={'sm'}>Movie Description</Text>
              <MovieCard movie={selectedMovie}/>
      </Box>

      <Box style={{  flex: 1.8, marginTop: 10, marginBottom: 5, minHeight: 190 }}>
        {!isSearch ? <Text>New Movies</Text>: null}
        <Carousel data={newMovies} onPress={(movie) => { handleSetSelectedMovie(movie) }}
          additionalBox={ (movie) => (<NativeButton2 onPress={() => {  handleStarPress(movie) }}><Center  style={{minHeight: 30, backgroundColor: '#2D2D2D', minHeight: 26,borderTopWidth: 1, borderColor: '#2F2F2F', borderBottomRightRadius: 2, borderBottomLeftRadius: 2}}><Icon as={Entypo} name="star" size={6} color={ favorites?.find(x => x.id === movie.id)? '#E40412' : '#f1f1f1' } /></Center></NativeButton2>) }
        />
      </Box>

    </Box>
  </ScrollView>
</PageContainer>
</>)



async function handleRestart(){
  await (async() => setIsSearch(false))();
  await (async() => searchRef.current.empty())();
  await (async() => searchRef.current.setError())();
  await (async() => setNewMovies([]))();
  await (async() => setTopMovies([]))();
  await handleSetNewMovies();
  await handleSetTopMovies();
}

const handleSearchDelay = debounce( () => {
        handleSearch(searchRef.current.getValue());
    }, 2300);

async function handleSearch(name){
  try{
    const result = await Axios('GET', '/api/movie/find/' + name, {}, {'authorization':  auth.accessToken});
    if(!result) throw new Error();
    await (async() => setIsSearch(true))();
    await (async() => setTopMovies([]))();
    if(result.length > 10){
      const length = result.length;
      await (async() => setNewMovies([]))();
      await (async() => setTopMovies( result.slice(0, ( (length / 2) -1 ) ) ))();
      await (async() => setNewMovies( result.slice( length / 2 ) ))();
    } else{await (async() => setTopMovies(result) )() }
    await (async() => setSelectedMovie(result[0]) )();
  }catch(e){searchRef.current.setError(e);}
}

async function handleSetNewMovies(){
  try{
    const result = await Axios('GET', '/api/movie/new/', {}, {'authorization':  auth.accessToken});
    if(!result) throw new Error();
    setNewMovies(result);
  }catch(e){alert(e);}
}

async function handleSetTopMovies(){
  let result;
  try{
    result = await Axios('GET', '/api/movie/top/', {}, {'authorization':  auth.accessToken});
    if(!result) throw new Error();
    if(result && result[0]) setSelectedMovie(result[0]);
  }catch(e){alert(e);}
  setTopMovies(result);
}

function handleSetSelectedMovie(movie){ setSelectedMovie(movie); }

function handleStarPress(movie){ AddRemoveFavorite(movie); }



return render();}
