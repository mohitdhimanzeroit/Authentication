import React,{useState, useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
const Home =  ()  => {
  const getItem = async () => {
  const data = await AsyncStorage.getItem('key');
      console.log(data,"yyyyyyyyyyy")
  }
  console.log(getItem(),"uuuuuuuu")
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "https://jsonplaceholder.typicode.com/posts"
  console.log(url,"hhhhhhhhhhh")
  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

  }, []); 
  <View style={styles.container}>
    <ScrollView style={styles.scrollView}>
  {loading ? (
    <Text>Loading...</Text>
  ) : (
    data.map((post) => {
      return (
        <View>
            
          <Text style={styles.title}>{post.title}</Text>
          <Text>{post.body}</Text>
          
        </View>
       
      );
    })
  )}
   </ScrollView>    
</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  scrollView: {
    backgroundColor: 'blue',
    marginHorizontal: 20,
  },
});

export default Home;
