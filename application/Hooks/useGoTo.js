import {useNavigation} from '@react-navigation/native';

export default function useGoTo(){
    const nav = useNavigation();
    return function goTo(to, params){ nav.navigate( to, params );  }
}