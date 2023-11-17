import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppForm from './components/AppForm';

import UserProfile from './components/UserProfile';
import { useLogin } from './context/LoginProvider';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import EnterOtp from './components/EnterOtp';
import DrawerNavigator from './DrawerNaviagtor';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name='AppForm' />
      
      <Stack.Screen component={UserProfile} name='UserProfile' />
      <Stack.Screen component={SignupForm} name='SignupForm' />
      <Stack.Screen component={LoginForm} name='LoginForm' />
      <Stack.Screen component={ForgetPassword} name='ForgetPassword' />
      <Stack.Screen component={ResetPassword} name='ResetPassword' />
      <Stack.Screen component={EnterOtp} name='EnterOtp' />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />;
};
export default MainNavigator;
