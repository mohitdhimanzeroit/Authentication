import React, { useState } from 'react';
import { View, StyleSheet, Text,Alert, TextInput, TouchableOpacity } from 'react-native';
import client from '../api/client';
import { useLogin } from '../context/LoginProvider';
import { isValidEmail, isValidObjField, updateError } from '../utils/methods';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import  navigation from '@react-navigation/native'
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Home from './Home';

const LoginForm = ({navigation}) => {
  const [getValue, setGetValue] = useState('');
  const { setIsLoggedIn, setProfile } = useLogin();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    
  });

  const [error, setError] = useState('');

  const { email, password, } = userInfo;

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
  
  const submitForm = async () => {
    if (isValidForm()) {
      try {
        
        const res = await client.post('http://16.171.194.117/auth/login-with-email-dummy', { ...userInfo });
        console.log(res.status, "oooooooooooooo")
        if (res.status == 200) {
          setUserInfo({  email: '', password: '' });
          
          
         
          AsyncStorage.setItem('key', res.data['payload']["token"]
          );
          Alert.alert("All Done!", "Your Login Successfully .", [{text: "OK", onPress: () => {navigation.navigate('DrawerNavigator')}}])     
          
        
          
       }

        console.log(res.data['payload'],"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        
     
    //     const data = await AsyncStorage.getItem('key');
    //  console.log(data,"yyyyyyyyyyy")
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
        value={email}
        onChangeText={value => handleOnChangeText(value, 'email')}
        label='Email'
        placeholder='Enter a email'
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
      <TouchableOpacity style={styles.button}onPress={() => navigation.navigate('ForgetPassword')}>
            <Text  style={{ color:'blue'}}>ForgetPassword?</Text>
          </TouchableOpacity>
      <FormSubmitButton onPress={ () => {submitForm(email, password)
      
      }} title='Login' />
      <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style= {{color: 'black'}}>Already have an account? </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignupForm')}>
            <Text style={{ color: 'blue'}}>SignupForm</Text>
          </TouchableOpacity>
          <Text style={styles.textStyle}>
          {getValue}
        </Text>
        </View>
    </FormContainer>
    
  );
};

const styles = StyleSheet.create({
  textStyle: {
    padding: 10,
    textAlign: 'center',
    color: 'black',
  },
});

export default LoginForm ;