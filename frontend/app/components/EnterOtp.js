import React, {useState} from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Fonts from '../common/assets/fonts';
import FormSubmitButton from './FormSubmitButton';
// import SvgIcon from '../common/assets/images/SvgIcon';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import client from '../api/client';
import { isValidEmail, isValidObjField, updateError } from '../utils/methods';
const  EnterOtpScreen = ({ route, navigation }) => {
  const { email } = route.params;
  console.log(email,"xxxxxx")

  const [ userInfo, setUserInfo] = useState({
   token: '',
    
  });
 console.log(userInfo,"bbbbbbbbbbbbbb")
  const [error, setError] = useState('');

  const { token  } = userInfo;

  console.log(userInfo, "zzzzzzzzzzz")
  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };
 console.log(handleOnChangeText, "eeeeeeeeeeeeeeee")
  // const isValidForm = () => {
  //   if (!isValidObjField(userInfo))
  //     return updateError('Required  fields!', setError);



  

  //   return true;
    
  // };
  console.log(!isValidObjField,"qqqqqqqqqqq")
  
  const submitForm = async () => {
  
      try {
      
        const res = await client.post('http://192.168.0.111:8000/verify-token', { ...userInfo });
          console.log(res.status, "nnnnnnnnnnnnnnnnnn")
        if (res.status == 200) {
       
          setUserInfo({ token: ''});
          console.log(res.status,"qqqqqqqqqqqqqqqqqqqqqqq");
          Alert.alert("All Done!", "Verify Otp Successfully .", [{text: "OK", onPress: () => {navigation.navigate('ResetPassword',  { email: email }) }}])
          
          
       }

        console.log(res.data,"xxxxxxxxxxxxxxxxxxxxxxxx");
        
        
      } catch (error) {
        console.log(error);
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
        <View style={{position: 'relative', bottom: 30}}>
          <View style={styles.loginIcon}>
            {/* <SvgIcon icon={'enterOtp'} width={280} height={280} /> */}
          </View>
          <View style={styles.container}>
            <View style={styles.loginLblCon}>
              <Text style={styles.loginLbl}>Enter OTP?</Text>
            </View>
            <View style={styles.forgotDes}>
              <Text style={styles.forgotDesLbl}>
                An 4 digit code has been sent to
              </Text>
              <Text style={styles.forgotDesLbl}>+91 1234567890</Text>
            </View>
            <View style={styles.formCon}>
              <OTPInputView
                 value={token}
                 onChangeText={value => handleOnChangeText(value, 'token')}
                pinCount={4}
                autoFocusOnLoad
                style={{width: '80%', height: 70}}
                codeInputFieldStyle={{color: '#000'}}
               
              />
               <FormSubmitButton 
              style={styles.LoginBtn}
              onPress={ () => {submitForm(token)
       
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
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 40,
  },
  loginLbl: {
    color: '#000',
    fontSize: 40,
    fontFamily: Fonts.type.NotoSansExtraBold,
  },
  forgotDes: {
    position: 'relative',
    bottom: 35,
  },
  forgotDesLbl: {
    color: '#000',
    fontFamily: Fonts.type.NotoSansRegular,
  },
  registerLbl: {color: '#0057ff', fontFamily: Fonts.type.NotoSansSemiBold},
});
export default EnterOtpScreen;