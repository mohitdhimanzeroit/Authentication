

import React, {useState} from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import Fonts from '../common/assets/fonts';
import SvgIcon from '../common/assets/images/SvgIcon';
import client from '../api/client';
import { isValidEmail, isValidObjField, updateError } from '../utils/methods';
import FormSubmitButton from './FormSubmitButton';
import FormInput from './FormInput';
const  ForgotPasswordScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    
    
  });
console.log(userInfo, "tttttttt")
  const [error, setError] = useState('');

  const { email } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };
 
  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError('Required fields!', setError);

    

  

    return true;
    
  };
  console.log(!isValidObjField,"aaaaaaa")
  const submitForm = async () => {
    if (isValidForm()) {
      try {
        
        const res = await client.post('http://192.168.0.111:8000/forget-password', { ...userInfo });
          console.log(res.status, "oooooooooooooo")
        if (res.status == 200) {
       
          setUserInfo({ email: ''});
          console.log(res.status,"lllllllllllll");
          Alert.alert("All Done!", "You have Sent Token to your Email Successfully .", [{text: "OK", onPress: () => {navigation.navigate('EnterOtp',  { email: email })}}])
           console.log(email,"mmmmmmmmmmmmmmmm");
          
       }

        console.log(res.data,"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        
        
      } catch (error) {
        console.log(error);
      }
    }
  };

    return (
      <>
      {error ? (
        <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
          {error}
        </Text>
      ) : null}
      <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
        <View style={{padding: 20}}>
          <Pressable onPress={() => this.props.navigation.goBack(null)}>
            {/* <SvgIcon icon={'back'} width={30} height={30} /> */}
          </Pressable>
        </View>
        <View style={{position: 'relative',}}>
          <View style={styles.loginIcon}>
            {/* <SvgIcon icon={'forgot'} width={320} height={320} /> */}
          </View>
          <View style={styles.container}>
            <View style={styles.loginLblCon}>
              <Text style={styles.loginLbl}>Forgot Password?</Text>
            </View>
            <View style={styles.forgotDes}>
              <Text style={styles.forgotDesLbl}>
              
              </Text>
            </View>
            <View style={styles.formCon}>
              <View style={styles.textBoxCon}>
                <View style={styles.at}>
                  {/* <SvgIcon icon={'at'} width={20} height={20} /> */}
                </View>
                <View style={styles.textCon}>
                <FormInput
        value={email}
        onChangeText={value => handleOnChangeText(value, 'email')}
        label='Email'
        placeholder='Enter a email'
        autoCapitalize='none'
      />
                </View>
              </View>
            </View>

            <View style={[styles.loginCon, {marginTop: 40}]}>
           
              <FormSubmitButton 
              style={styles.LoginBtn}
              onPress={ () => {submitForm(email)
       
    }} title='Submit'/>
      
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      </>
    );
  }


const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: '#fff',
    
  },
  loginIcon: {
    alignSelf: 'center',
  },
  formCon: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  container: {
    paddingHorizontal: 20,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 10,
  },
  loginLbl: {
    color: '#000',
    fontSize: 40,
    fontFamily: Fonts.type.NotoSansExtraBold,
  },
  at: {
    alignSelf: 'center',
    width: '10%',
  },

  textBoxCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCon: {
    width: '90%',
  },

  textInput: {
    borderBottomColor: '#aaa',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: 'black',
    fontSize: 16,
    
    height: 10,
  },

  LoginBtn: {
    backgroundColor: '#0057ff',
    borderRadius: 20,
  },
  loginBtnLbl: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansBlack,
    color: '#fff',
    paddingVertical: 10,
  },

  forgotDes: {
    position: 'relative',
    bottom: 35,
  },
  forgotDesLbl: {
    color: '#000',
    fontFamily: Fonts.type.NotoSansRegular,
  },
});

export default ForgotPasswordScreen;