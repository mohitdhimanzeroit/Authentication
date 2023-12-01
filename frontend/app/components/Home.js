import React,{useState, useEffect} from 'react';
import { Text, View, StyleSheet,FlatList ,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Image } from 'react-native-svg';
const Home =  ()  => {
  const getItem = async () => {
  const data = await AsyncStorage.getItem('key');
      console.log(data,"yyyyyyyyyyy")
  }
  console.log(getItem())
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');

      if (response.ok) {
        const result = await response.json();
        setData(result);
        console.log(result,"mmmmmmmmmmmmmm")
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>

          {/* Display the fetched data using FlatList */}
          <FlatList 
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text>Price $ {item.price}</Text>
                <Text>{item.description}</Text>
                <Image style={styles.tinyLogo} source={{ uri: item.image }} />
                {/* Add more components to display other properties as needed */}
              </View> 
            )}
          />

          {/* Button to trigger a new API request */}
          {/* <Button title="Fetch Data" onPress={fetchData} /> */}
        </View>
      )}
    </View>
    
  );
  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
    padding: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
});


export default Home;
