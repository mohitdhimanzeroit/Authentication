import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image ,StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Home from './components/Home';
import Tasks from './components/Tasks';
import { useLogin } from './context/LoginProvider';
import Colors from '../constants/Colors'
import imgPlaceHolder from '../assets/user_boy.png'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImagePicker, { openPicker } from 'react-native-image-crop-picker';
const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const { setIsLoggedIn } = useLogin();
  const [profile, setProfile] = useState(null)
  const imagePick = () => {
    ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true
    }).then(image => {
        console.log(image);
        setProfile(image.path)
    });
}

const uploadImage = async () => {
  // Check if any file is selected or not
  if (singleFile != null) {
    // If file selected then create FormData
    const fileToUpload = singleFile;
    const data = new FormData();
    data.append('name', 'Image Upload');
    data.append('file_attachment', fileToUpload);
    // Please change file upload URL
    let res = await fetch(
      'http://16.171.194.117/private/edit-photo',
      {
        method: 'post',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      }
    );
    let responseJson = await res.json();
    if (responseJson.status == 1) {
      alert('Upload Successful');
    }
  } else {
    // If no file selected the show alert
    alert('Please Select File first');
  }
};
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileContainer}>
                <View style={styles.imgContainer}>
                    <Image style={styles.image} source={profile ? { uri: profile } : imgPlaceHolder} />
                    <TouchableOpacity onPress={imagePick}
                        style={{ alignItems: 'flex-end', top: -20 }}>
                        <FontAwesome name="pencil" size={20} color={Colors.green} />
                    </TouchableOpacity>
                </View>
                </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          color: 'black',
          backgroundColor: 'black',
          padding: 20,
        }}
        onPress={() => setIsLoggedIn(false)}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: '',
      }}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen component={Home} name='Home' />
      <Drawer.Screen component={Tasks} name='Tasks' />
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  profileContainer: {
      flex: 0.8,
      justifyContent: 'center',
      alignItems: 'center'
  },
  imgContainer: {},
  textContainer: {
      alignItems: 'center',
  },
  image: {
      width: 110,
      height: 110,
      borderRadius: 55,
      borderColor:Colors.black,
      borderWidth: 3,
  },
  userInfo: {
      flex: 1,
  },
  bio: {
      borderRadius: 10,
      padding: 16,
      margin: 16
  }
})
export default DrawerNavigator;
