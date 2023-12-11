import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button, Alert } from 'react-native';
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
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import SyncStorage from "sync-storage";
const Drawer = createDrawerNavigator();

const CustomDrawer = props => {




  const { setIsLoggedIn } = useLogin();
  const [profile, setSelectedImage] = useState(null)
  const [profileData, setProfileData] = useState(null);
  // const [profileData1, setProfileData1] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('key');
        console.log(token, "z1111111oohltmmmnln")
        const response = await fetch('http://16.171.194.117/private/user-get-profile', {
          method: 'POST',
          headers: {

            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Response Status:', response.status);

        if (!response.ok) {
          console.log(response, "jjjjjjjjjjjjjjj")
          return;
        }

        const data = await response.json();
        
        console.log(data["payload"][0]["user_img_array"][0]['usd_user_image_one'], "hhhhhhhhhhhhhhhhh");


  
setProfileData(data["payload"][0]["user_img_array"][0]['usd_user_image_one']);
console.log(setProfileData,"oooooooooooo")    
} catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);


  const openImagePicker = async () => {
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
        console.log(imageUri, "mmmmmmmmmmmmmmmmmmm")
      }
      console.log(response, "kklkkkkk")

      uploadImage(response)

    });
  };
  const uploadImage = async response => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName,
      });
      console.log(formData, "llllllljjjjjjjjjjjjjjjjj")
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