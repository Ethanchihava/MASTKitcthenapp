import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TextInput, Button, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Starters');
  const [image, setImage] = useState(null);

  const addMenuItem = () => {
    if (dishName && description && price && image) {
      const newItem = { dishName, description, price, category, image };
      setMenuItems((currentItems) => [...currentItems, newItem]);
      setDishName('');
      setDescription('');
      setPrice('');
      setImage(null);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('./img/logo 2.jpeg')}
        style={styles.logo}
      />
  
      <Text style={styles.header}>Chef Menu App</Text>
      <Text style={styles.totalItems}>Total Menu Items: {menuItems.length}</Text>

      <Text>Dish Name</Text>
      <TextInput
        placeholder="eg. Pizza"
        value={dishName}
        onChangeText={setDishName}
        style={styles.input}
      />
      
      <Text>Description</Text>
      <TextInput
        placeholder="describe the food"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      
      <Text>Price</Text>
      <TextInput
        placeholder="cost"
        value={price}
        onChangeText={(value) => setPrice(value.replace(/[^0-9.]/g, ''))}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>

      <View style={styles.buttonContainer}>
        <Button title="Pick an image" onPress={pickImage} />
      </View>

      {image && <Image source={{ uri: image }} style={styles.image} />}
      
      <View style={styles.buttonContainer}>
        <Button title="Add Menu Item" onPress={addMenuItem} />
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Image source={{ uri: item.image }} style={styles.menuImage} />
            <Text style={styles.itemName}>{item.dishName} - ${item.price}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>
        )}
      />

      {/* Recommended Dishes Section */}
      <View style={styles.recommendedContainer}>
        <Text style={styles.recommendedHeader}>Recommended Starters:</Text>
        <Text style={styles.recommendedItem}>Baked Spring Rolls - $5.00</Text>
        <Text style={styles.recommendedItem}>Roasted Mushrooms - $6.50</Text>
        <Text style={styles.recommendedItem}>Bruschetta - $4.00</Text>

        <Text style={styles.recommendedHeader}>Recommended Main Meals:</Text>
        <Text style={styles.recommendedItem}>Tacos - $8.00</Text>
        <Text style={styles.recommendedItem}>Lasagna - $10.00</Text>
        <Text style={styles.recommendedItem}>Tofu Stir-fry - $9.00</Text>

        <Text style={styles.recommendedHeader}>Recommended Desserts:</Text>
        <Text style={styles.recommendedItem}>Yogurt - $3.00</Text>
        <Text style={styles.recommendedItem}>Jelly - $2.50</Text>
        <Text style={styles.recommendedItem}>Cake - $4.50</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  totalItems: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    padding: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 10,
  },
  buttonContainer: {
    marginVertical: 15,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  menuItem: {
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  itemName: {
    fontWeight: 'bold',
  },
  category: {
    color: 'gray',
  },
  recommendedContainer: {
    marginTop: 20,
    padding: 10,
  },
  recommendedHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recommendedItem: {
    fontSize: 16,
    marginBottom: 3,
  },
});
