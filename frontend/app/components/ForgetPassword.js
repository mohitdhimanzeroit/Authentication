
// import React, { useState } from 'react';
// import {
//   View, StyleSheet, TextInput, Text,

//   Pressable,

//   KeyboardAvoidingView
// } from 'react-native';
// import client from '../api/client';
// import { useLogin } from '../context/LoginProvider';
// import { isValidEmail, isValidObjField, updateError } from '../utils/methods';
// import FormContainer from './FormContainer';
// import FormInput from './FormInput';
// import FormSubmitButton from './FormSubmitButton';
// import navigation from '@react-navigation/native'

// import Home from './Home';
// import Fonts from '../common/assets/fonts';

// import SvgIcon from '../common/assets/images/SvgIcon';
// const ForgetPassword = ({ navigation }) => {


//   const [userInfo, setUserInfo] = useState({
//     email: '',
    

//   });

//   const [ setError] = useState('');

//   const { email } = userInfo;

//   const handleOnChangeText = (value, fieldName) => {
//     setUserInfo({ ...userInfo, [fieldName]: value });
//   };

//   const isValidForm = () => {
//     if (!isValidObjField(userInfo))
//       return updateError('Required all fields!', setError);




//     return true;

//   };

//   const submitForm = async () => {
//     if (isValidForm()) {
//       try {

//         const res = await client.post('http://192.168.0.111:8001/forget-password', { ...userInfo });

//         if (res.data.success) {
          
//           setUserInfo({ email: '' });
          
//           setProfile(res.data.user);
        
        
//           setIsLoggedIn(true);

//         }

//         console.log(res.data, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");


//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   return (
//     <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
//       <View style={{ padding: 20 }}>
//         <Pressable onPress={() => this.props.navigation.goBack(null)}>
//           <SvgIcon icon={'back'} width={30} height={30} />
//         </Pressable>
//       </View>
//       <View style={{ position: 'relative', bottom: 30 }}>
//         <View style={styles.loginIcon}>
//           <SvgIcon icon={'forgot'} width={320} height={320} />
//         </View>
//         <View style={styles.container}>
//           <View style={styles.loginLblCon}>
//             <Text style={styles.loginLbl}>Forgot Password?</Text>
//           </View>
//           <View style={styles.forgotDes}>
//             <Text style={styles.forgotDesLbl}>
//               Don't worry! It happens, please enter the address associated
//               with your account
//             </Text>
//           </View>
//           <View style={styles.formCon}>
//             <View style={styles.textBoxCon}>
//               <View style={styles.at}>
//                 <SvgIcon icon={'at'} width={20} height={20} />
//               </View>
//               <View style={styles.textCon}>
//                 <TextInput
//                   value={email}
//                   onChangeText={value => handleOnChangeText(value, 'email')}
//                   style={styles.textInput}
//                   placeholder='Email ID'
//                   placeholderTextColor='#aaa'
//                 />
//               </View>
//             </View>
//           </View>

//           <View style={[styles.loginCon, { marginTop: 40 }]}>
//             <Pressable
//               style={styles.LoginBtn}
//               onPress={() => this.props.navigation.navigate('EnterOtp')}>
//               <Text style={styles.loginBtnLbl}>Submit</Text>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   mainCon: {
//     backgroundColor: '#fff',
//     flex: 1,
//   },
//   loginIcon: {
//     alignSelf: 'center',
//   },
//   formCon: {
//     flexDirection: 'column',
//     justifyContent: 'space-around',
//   },
//   container: {
//     paddingHorizontal: 20,
//   },
//   loginLblCon: {
//     position: 'relative',
//     bottom: 40,
//   },
//   loginLbl: {
//     color: '#000',
//     fontSize: 40,
//     fontFamily: Fonts.type.NotoSansExtraBold,
//   },
//   at: {
//     alignSelf: 'center',
//     width: '10%',
//   },

//   textBoxCon: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   textCon: {
//     width: '90%',
//   },

//   textInput: {
//     borderBottomColor: '#aaa',
//     borderWidth: 1,
//     borderTopWidth: 0,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//     color: '#000',
//     fontSize: 16,
//     fontFamily: Fonts.type.NotoSansMedium,
//     height: 40,
//   },

//   LoginBtn: {
//     backgroundColor: '#0057ff',
//     borderRadius: 20,
//   },
//   loginBtnLbl: {
//     textAlign: 'center',
//     fontSize: 16,
//     fontFamily: Fonts.type.NotoSansBlack,
//     color: '#fff',
//     paddingVertical: 10,
//   },

//   forgotDes: {
//     position: 'relative',
//     bottom: 35,
//   },
//   forgotDesLbl: {
//     color: '#000',
//     fontFamily: Fonts.type.NotoSansRegular,
//   },
// });

// export default ForgetPassword;

import React, {Component} from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Fonts from '../common/assets/fonts';
import SvgIcon from '../common/assets/images/SvgIcon';


export default class ForgotPasswordScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
        <View style={{padding: 20}}>
          <Pressable onPress={() => this.props.navigation.goBack(null)}>
            <SvgIcon icon={'back'} width={30} height={30} />
          </Pressable>
        </View>
        <View style={{position: 'relative', bottom: 30}}>
          <View style={styles.loginIcon}>
            <SvgIcon icon={'forgot'} width={320} height={320} />
          </View>
          <View style={styles.container}>
            <View style={styles.loginLblCon}>
              <Text style={styles.loginLbl}>Forgot Password?</Text>
            </View>
            <View style={styles.forgotDes}>
              <Text style={styles.forgotDesLbl}>
                Don't worry! It happens, please enter the address associated
                with your account
              </Text>
            </View>
            <View style={styles.formCon}>
              <View style={styles.textBoxCon}>
                <View style={styles.at}>
                  <SvgIcon icon={'at'} width={20} height={20} />
                </View>
                <View style={styles.textCon}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={'Email ID'}
                    placeholderTextColor={'#aaa'}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.loginCon, {marginTop: 40}]}>
              <Pressable
                style={styles.LoginBtn}
                onPress={() => this.props.navigation.navigate('EnterOtp')}>
                <Text style={styles.loginBtnLbl}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: '#fff',
    flex: 1,
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
    bottom: 40,
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
    color: '#000',
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansMedium,
    height: 40,
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