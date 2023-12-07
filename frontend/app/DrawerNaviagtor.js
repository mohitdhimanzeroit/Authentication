import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button,  Alert} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Home from './components/Home';
import Tasks from './components/Tasks';
import { useLogin } from './context/LoginProvider';
import Colors from '../constants/Colors'
import imgPlaceHolder from '../assets/user_boy.png'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
const Drawer = createDrawerNavigator();

const CustomDrawer = props => {




  const { setIsLoggedIn } = useLogin();
  const [profile, setSelectedImage] = useState(null)


  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
     
      uploadImage(response)
      console.log(response,"kklkkkkk")
    });
  };
  const uploadImage = async image => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: profile,
        type: 'image/jpeg',
        name: 'fileName',
      });          
      const token = await AsyncStorage.getItem('key');
      console.log(token, "zzzzzz")
      // Make an API request to upload the image using the authorization token
      await axios.post('http://16.171.194.117/private/edit-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle the successful upload if needed
      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileContainer}>
          <View style={styles.imgContainer}>
            <Image style={styles.image} source={profile ? { uri: profile } : imgPlaceHolder} />
            <TouchableOpacity onPress={openImagePicker}
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
    borderColor: Colors.black,
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