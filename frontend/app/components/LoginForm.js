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
import axios from 'axios';
const LoginScreen = ({navigation}) => {
     const [getValue, setGetValue] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
     const [error, setError] = useState('');
  const handleLogin = async () => {
    try {
      const response = await fetch('http://16.171.194.117/auth/login-with-phone-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          password,
          deviceToken: 'fioeirotu90945',
          devicePlatform: 'Android',
          deviceId: '24234234',
          countryCode: '+91',
        }),
      });

      const data = await response.json();
      console.log(data,"jjjjjjjjjj")
      console.log(response.status, "oooooooooooooo")
      if (response.status == 200) {
        // Login successful, handle authentication logic (e.g., store token)
           
        AsyncStorage.setItem('key', data['payload']["token"]
         );
         Alert.alert("All Done!", "Your Login Successfully .", [{text: "OK", onPress: () => {navigation.navigate('DrawerNavigator')}}])
         console.log(data['payload'],"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
         console.log( response,'Login successful');

      } else {
        // Login failed, display an error message
        Alert.alert('Login Failed', data.message || 'Something went wrong');
      }


    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred during login');
    }
  };

// const LoginForm = ({navigation}) => {
//   const [getValue, setGetValue] = useState('');
//   const { setIsLoggedIn, setProfile } = useLogin();
//   const [userInfo, setUserInfo] = useState({
//     phone: '',
//     password: '',
    
//   });

//   const [error, setError] = useState('');

//   const { phone, password, } = userInfo;

//   const handleOnChangeText = (value, fieldName) => {
//     setUserInfo({ ...userInfo, [fieldName]: value });
//   };
 
//   const isValidForm = () => {
//     if (!isValidObjField(userInfo))
//       return updateError('Required all fields!', setError);

    

//     if (!password.trim() || password.length < 5)
//       return updateError('Password is too short!', setError);

//     return true;
    
//   };
  
//   const submitForm = async () => {
//     if (isValidForm()) {
//       try {
        
//         const res = await axios.post('http://16.171.194.117/auth/login-with-phone-email', { ...userInfo } ,{
         
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             phone,
//             password,
//             deviceToken: 'fioeirotu90945',
//             devicePlatform: 'Android',
//             deviceId: '24234234',
//             countryCode: '+91',
//           }),
//         }) ;
//         console.log(res,"pppppppppppppppp")
//         console.log(res.status, "oooooooooooooo")
//         if (res.status == 200) {
//           setUserInfo({  phone: '', password: '' });
          
          
         
//           AsyncStorage.setItem('key', res.data['payload']["token"]
//           );
//           Alert.alert("All Done!", "Your Login Successfully .", [{text: "OK", onPress: () => {navigation.navigate('DrawerNavigator')}}])     
          
        
          
//        }

//         console.log(res.data['payload'],"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        
     
//     //     const data = await AsyncStorage.getItem('key');
//     //  console.log(data,"yyyyyyyyyyy")
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };
  
  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={phone}
        onChangeText={value => setPhone(value, 'phone')}
        label='Phone'
        placeholder='Enter a Phone'
        autoCapitalize='none'
      />
      <FormInput
        value={password}
        onChangeText={value => setPassword(value, 'password')}
        label='Password'
        placeholder='******'
        autoCapitalize='none'
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}onPress={() => navigation.navigate('ForgetPassword')}>
            <Text  style={{ color:'blue'}}>ForgetPassword?</Text>
          </TouchableOpacity>
      <FormSubmitButton onPress={ () => {handleLogin(phone, password)
      
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

export default LoginScreen ;