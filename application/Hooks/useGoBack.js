import {useNavigation} from '@react-navigation/native';

export default function useBack(){
    const nav = useNavigation();
    return function goBack(){ nav.goBack();  }
}