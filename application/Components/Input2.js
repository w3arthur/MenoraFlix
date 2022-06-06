import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Input as NativeInput,StyleSheet, TextInput, View } from 'react-native';
import { Text, Box, Input as BaseInput, FormControl, Center } from "native-base";


const Input = forwardRef( ({ onChangeText, value : externalValue, leftIcon, rightButton , label, placeholder, onSubmit, style, children, ...props}, ref) => {
  const [value, setValue] = useState(children || externalValue);
  const textInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  useImperativeHandle (ref, () => ({
    getValue: () => (value || '').trim()
    ,setValue: (val) => setValue(val || '')
    ,setError: (val) => setErrorMessage(val || '')
    ,empty: () => setValue('')
    , getNumber: () => Number(value)
    , focus: () => handleFocus()
  }));
  function handleFocus(){ textInputRef.current?.focus(); }
return (<>
<Box style={styleInput.box}>
{label ? <FormControl.Label onPress={handleFocus} ><Text onPress={ handleFocus } style={styleInput.labelText}>{label}</Text></FormControl.Label> : null}
  <Box ml={3} mr={4} mb={2}>
    <Box style={leftIcon || rightButton ? { flexDirection: 'row', alignItems: 'center' } : { minWidth: '50%',alignItems: 'center'}}>
      {leftIcon ? <Box style={{marginRight: 2}}>{leftIcon}</Box> : null}
      <Box style={leftIcon || rightButton ? {flex: 1} : {width: '100%', minHeight: 30}}>
        <BaseInput  selectionColor={'#f1f1f1'} style={{ ...styleInput.input , ...style}} variant="unstyled" placeholderTextColor={'#a1a1a1'} value={value} size='2xl' {...props}  placeholder={placeholder}  onChangeText={async(e) => {/*await*/ setValue(e); await onChangeText&&onChangeText(); setErrorMessage('')}} returnKeyType={onSubmit ?'next': 'done'} onSubmitEditing={onSubmit} ref={textInputRef} />
      </Box>
      {rightButton ? <Box style={{marginLeft: 8,height: '100px'}}>{rightButton}</Box>: null}
  </Box>
  {errorMessage !== '' ?<Center><Text>{errorMessage}</Text></Center>: null}
</Box>
</Box>
</>)
})

export default Input;

const styleInput = StyleSheet.create({
box: {  height: 40, marginTop: 3}
, label: {}
, labelText: {color: '#000000'}
, input:{ textAlign: 'center', backgroundColor: '#000000', height: 40, borderColor: 'red', borderWidth: 1}
//, placeholder: {textAlign: 'left'}
});