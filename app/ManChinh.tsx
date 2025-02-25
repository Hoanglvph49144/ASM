import React, { useEffect, useState, useContext } from 'react';
import { 
  View, Text, Image, TouchableOpacity, FlatList, 
  StyleSheet, StatusBar, TextInput, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; 


const HomeScreen = () => {
  const router = useRouter(); 
  const [productsData, setProductsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 


  useEffect(() => {
    fetch('https://67bc90f5ed4861e07b3b1328.mockapi.io/ASM')
      .then(response => response.json())
      .then(data => setProductsData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);



  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#0C0F14'} barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/ManDN')}>
                  <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                
        <Text style={styles.title}>☕ Tìm kiếm cà phê ngon nhất</Text>
       
      </View>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Tìm kiếm cà phê..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={productsData.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: `/products/${item.id}`,
                params: { 
                  name: item.name, 
                  avatar: item.avatar, 
                  description: item.description, 
                  price: item.price 
                }
              });
            }}
            style={styles.productCard}
          >
            <Image style={styles.productImage} source={{ uri: item.avatar }} />
<Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${Number(item.price).toFixed(2)}</Text>
          
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0C0F14', 
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: { 
    color: 'white', 
    fontSize: 22, 
    fontWeight: 'bold',
    flex: 1,
  },
  cartButton: {
    backgroundColor: '#FF7F50',
    padding: 10,
    borderRadius: 10,
    position: 'relative',
  },
  cartCountContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // Search bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E232B',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },

  // Product List
  listContainer: { 
    paddingBottom: 20, 
  },
  productCard: { 
    backgroundColor: '#1C1F26', 
    borderRadius: 15, 
    padding: 10, 
    margin: 8, 
    flex: 1, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: { 
    width: 120, 
    height: 120, 
    borderRadius: 15, 
    marginBottom: 10,
  },
  productName: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: '600', 
    textAlign: 'center',
  },
  productPrice: { 
    color: '#D17842', 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginTop: 5,
  },
  addButton: { 
    backgroundColor: '#FF7F50', 
    padding: 6, 
    borderRadius: 10, 
    marginTop: 10, 
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#21262E',
    borderRadius: 10,
  }
});

export default HomeScreen;