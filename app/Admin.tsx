import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Products = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  price: number;
};

const HomeScreen = () => {
  const [productsData, setProductsData] = useState<Products[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Products | null>(null);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', avatar: '', price: '' });

  useEffect(() => {
    fetch('https://67bc90f5ed4861e07b3b1328.mockapi.io/ASM')
      .then(response => response.json())
      .then(data => setProductsData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSaveProduct = async () => {
    const method = editingProduct ? 'PUT' : 'POST';
    const url = editingProduct
      ? `https://67bc90f5ed4861e07b3b1328.mockapi.io/ASM/${editingProduct.id}`
      : 'https://67bc90f5ed4861e07b3b1328.mockapi.io/ASM';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProduct, price: parseFloat(newProduct.price) }),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProductsData((prev) =>
          editingProduct ? prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)) : [...prev, updatedProduct]
        );
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }

    setModalVisible(false);
    setEditingProduct(null);
    setNewProduct({ name: '', description: '', avatar: '', price: '' });
  };

  const handleDeleteProduct = async (deleteProductID: string) => {
    try {
      const response = await fetch(`https://67bc90f5ed4861e07b3b1328.mockapi.io/ASM/${deleteProductID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProductsData(productsData.filter((item) => item.id !== deleteProductID));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditProduct = (product: Products) => {
    setEditingProduct(product);
    setNewProduct({ name: product.name, description: product.description, avatar: product.avatar, price: product.price.toString() });
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: Products }) => (
    <View style={styles.coffeeItemContainer}>
      <Image style={styles.coffeeItemImage} source={{ uri: item.avatar }} />
      <View style={styles.textContainer}>
        <Text style={styles.coffeeItemName}>{item.name}</Text>
<Text style={styles.coffeeItemDescription}>{item.description}</Text>
        <Text style={styles.coffeeItemPrice}>${Number(item.price).toFixed(2)}</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={() => handleEditProduct(item)} style={styles.editButton}>
          <Ionicons name="create" size={18} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteProduct(item.id)} style={styles.deleteButton}>
          <Ionicons name="close" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar backgroundColor={'#0C0F14'} barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity></TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}></Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Thêm sản phẩm</Text>
      </TouchableOpacity>
      <FlatList data={productsData} renderItem={renderItem} keyExtractor={(item) => item.id} numColumns={1} />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editingProduct ? 'Edit Product' : 'Add Product'}</Text>
            <TextInput placeholder="Tên sản phẩm" style={styles.input} value={newProduct.name} onChangeText={(text) => setNewProduct({ ...newProduct, name: text })} />
            <TextInput placeholder="Mô tả" style={styles.input} value={newProduct.description} onChangeText={(text) => setNewProduct({ ...newProduct, description: text })} />
            <TextInput placeholder="Ảnh" style={styles.input} value={newProduct.avatar} onChangeText={(text) => setNewProduct({ ...newProduct, avatar: text })} />
            <TextInput placeholder="Giá sản phẩm" style={styles.input} keyboardType="numeric" value={newProduct.price} onChangeText={(text) => setNewProduct({ ...newProduct, price: text })} />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProduct}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  container: { flex: 1, backgroundColor: '#0C0F14' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30, marginTop: 20 },
  button: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#21262E', borderRadius: 10 },
  titleContainer: { marginStart: 30, marginTop: 30 },
  title: { color: 'white', fontSize: 28, fontWeight: '700' },
  coffeeItemContainer: { width: '100%', padding: 15, borderRadius: 20, backgroundColor: '#1C1F26', marginBottom: 15 },
  coffeeItemImage: { width: '100%', height: 200, borderRadius: 15 },
  textContainer: { alignItems: 'center', marginTop: 10 },
  coffeeItemName: { color: 'white', fontSize: 16, fontWeight: '600' },
  coffeeItemDescription: { color: 'gray', fontSize: 12, textAlign: 'center' },
  coffeeItemPrice: { color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  deleteButton: { position: 'absolute', top: 10, right: 10, backgroundColor: 'red', padding: 6, borderRadius: 15 },
  editButton: { position: 'absolute', top: 10, left: 10, backgroundColor: 'blue', padding: 6, borderRadius: 15 },
  addButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 10, alignItems: 'center', margin: 20 },
  addButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default HomeScreen;
