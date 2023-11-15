import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import client from '../api/client';
import { useLogin } from '../context/LoginProvider';
import { isValidEmail, isValidObjField, updateError } from '../utils/methods';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import { StackActions } from '@react-navigation/native';
import Home from './Home';

const LoginForm = (navigation) => {

  const { setIsLoggedIn, setProfile } = useLogin();
  const [userInfo, setUserInfo] = useState({
    phone: '',
    password: '',
    countryCode: '',
    deviceToken: '',
    devicePlatform: '',
    deviceId: '',
  });

  const [error, setError] = useState('');

  const { phone, password, countryCode, deviceId, devicePlatform, deviceToken } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };
 
  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError('Required all fields!', setError);

    

    if (!password.trim() || password.length < 8)
      return updateError('Password is too short!', setError);

    return true;
    
  };
  const moveTo = (screen, payload) =>{
    navigation.navigate(screen, { ...payload })
   }
  const submitForm = async () => {
    if (isValidForm()) {
      try {
        
        const res = await client.post('http://54.147.129.86/auth/login', { ...userInfo });

        if (res.data.success) {
          setUserInfo({ phone: '', password: '', countryCode: '', deviceId: '', devicePlatform: '', deviceToken: '' });
          
          setProfile(res.data.user);
        
        
          setIsLoggedIn(true);
           moveTo('Home');
       }

        console.log(res.data,"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        
        
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={phone}
        onChangeText={value => handleOnChangeText(value, 'phone')}
        label='Phone'
        placeholder='Enter a Phone Number'
        autoCapitalize='none'
      />
      <FormInput
        value={password}
        onChangeText={value => handleOnChangeText(value, 'password')}
        label='Password'
        placeholder='********'
        autoCapitalize='none'
        secureTextEntry
      />
      <FormInput
        value={devicePlatform}
        onChangeText={value => handleOnChangeText(value, 'devicePlatform')}
        label='DevicePlatform'
        placeholder=''
        autoCapitalize='none'

      />
      <FormInput
        value={deviceToken}
        onChangeText={value => handleOnChangeText(value, 'deviceToken')}
        label='Device Token'
        placeholder=''
        autoCapitalize='none'
      
      />
      <FormInput
        value={deviceId}
        onChangeText={value => handleOnChangeText(value, 'deviceId')}
        label='DeviceId'
        placeholder=''
        autoCapitalize='none'

      />
      <FormInput
        value={countryCode}
        onChangeText={value => handleOnChangeText(value, 'countryCode')}
        label='CountryCode'
        placeholder=''
        autoCapitalize='none'

      />
      <FormSubmitButton onPress={submitForm} title='Login' />
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;
