import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  subtitle: string;
  image: string;
  sizes?: { size: string; price: number }[];
  weights?: { weight: string; price: number }[];
  tags: string[];
  roastType: string;
  type: 'drink' | 'bean';
}

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // Modal xác nhận xóa
  const [productToDelete, setProductToDelete] = useState<string | null>(null); // Lưu ID sản phẩm cần xóa
  const [name, setName] = useState("");
  const [subTitle, setSubTitle] = useState('');
  const [priceS, setPriceS] = useState("");
  const [priceM, setPriceM] = useState("");
  const [priceL, setPriceL] = useState("");
  const [price250g, setPrice250g] = useState("");
  const [price500g, setPrice500g] = useState("");
  const [price1kg, setPrice1kg] = useState("");
  const [image, setImage] = useState("");
  const [mota, setMota] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [roastType, setRoastType] = useState("");
  const [type, setType] = useState<'drink' | 'bean'>('drink');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>(["Coffee", "Tea", "Milk", "Sweet", "Strong"]);

  // Fetch products from API
  useEffect(() => {
    fetch('http://192.168.2.6:3000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log("Lỗi data ", error));
  }, []);

  // Reset form when modal is closed
  useEffect(() => {
    if (!modalVisible) {
      setName("");
      setSubTitle("");
      setPriceS("");
      setPriceM("");
      setPriceL("");
      setPrice250g("");
      setPrice500g("");
      setPrice1kg("");
      setImage("");
      setMota("");
      setTags([]);
      setRoastType("");
      setType('drink');
      setEditingProduct(null);
    }
  }, [modalVisible]);

  // Handle add product
  const handleAdd = async () => {
    if (!name || !image || !tags.length || !roastType) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name,
      subtitle: subTitle,
      price: type === 'drink' ? parseFloat(priceS) : parseFloat(price250g),
      image,
      description: mota,
      sizes: type === 'drink' ? [
        { size: "S", price: parseFloat(priceS) },
        { size: "M", price: parseFloat(priceM) },
        { size: "L", price: parseFloat(priceL) },
      ] : [],
      weights: type === 'bean' ? [
        { weight: "250g", price: parseFloat(price250g) },
        { weight: "500g", price: parseFloat(price500g) },
        { weight: "1kg", price: parseFloat(price1kg) },
      ] : [],
      tags,
      roastType,
      type,
    };

    try {
      await fetch('http://192.168.2.6:3000/products', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      setProducts([...products, newProduct]);
      Alert.alert('Thêm sản phẩm thành công');
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể thêm sản phẩm.");
    }
  };

  // Handle edit product
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setSubTitle(product.subtitle);
    setType(product.type);
    if (product.type === 'drink') {
      setPriceS(product.sizes?.find(size => size.size === "S")?.price.toString() || "");
      setPriceM(product.sizes?.find(size => size.size === "M")?.price.toString() || "");
      setPriceL(product.sizes?.find(size => size.size === "L")?.price.toString() || "");
    } else {
      setPrice250g(product.weights?.find(weight => weight.weight === "250g")?.price.toString() || "");
      setPrice500g(product.weights?.find(weight => weight.weight === "500g")?.price.toString() || "");
      setPrice1kg(product.weights?.find(weight => weight.weight === "1kg")?.price.toString() || "");
    }
    setImage(product.image);
    setMota(product.description);
    setTags(product.tags);
    setRoastType(product.roastType);
    setModalVisible(true);
  };

  // Handle update product
  const handleUpdate = async () => {
    if (!editingProduct || !name || !image || !tags.length || !roastType) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const updatedProduct = {
      ...editingProduct,
      name,
      subtitle: subTitle,
      price: type === 'drink' ? parseFloat(priceS) : parseFloat(price250g),
      image,
      description: mota,
      sizes: type === 'drink' ? [
        { size: "S", price: parseFloat(priceS) },
        { size: "M", price: parseFloat(priceM) },
        { size: "L", price: parseFloat(priceL) },
      ] : [],
      weights: type === 'bean' ? [
        { weight: "250g", price: parseFloat(price250g) },
        { weight: "500g", price: parseFloat(price500g) },
        { weight: "1kg", price: parseFloat(price1kg) },
      ] : [],
      tags,
      roastType,
      type,
    };

    try {
      await fetch(`http://192.168.2.6:3000/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      setProducts(products.map(product => product.id === editingProduct.id ? updatedProduct : product));
      Alert.alert('Cập nhật sản phẩm thành công');
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể cập nhật sản phẩm.");
    }
  };

  // Handle delete product
  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://192.168.2.6:3000/products/${id}`, {
        method: 'DELETE',
      });
      setProducts(products.filter(product => product.id !== id));
      Alert.alert('Xóa sản phẩm thành công');
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể xóa sản phẩm.");
    } finally {
      setDeleteModalVisible(false); // Đóng modal xác nhận xóa
    }
  };

  // Handle tag selection
  const handleTagPress = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  // Render product item
  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}$</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => handleEdit(item)}>
          <Ionicons name="create-outline" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => {
            setProductToDelete(item.id); // Lưu ID sản phẩm cần xóa
            setDeleteModalVisible(true); // Hiển thị modal xác nhận xóa
          }}
        >
          <Ionicons name="trash-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      
      <Text style={styles.sectionTitle}>Danh sách sản phẩm</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={renderItem}
      />

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
      </TouchableOpacity>

      {/* Modal thêm/sửa sản phẩm */}
      <Modal visible={modalVisible} animationType='slide' transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</Text>
            <TextInput placeholder="Tên sản phẩm" value={name} onChangeText={setName} style={styles.input} />
            <TextInput placeholder="Đi kèm (vd: with...)" value={subTitle} onChangeText={setSubTitle} style={styles.input} />
            <Picker
              selectedValue={type}
              onValueChange={(itemValue: 'drink' | 'bean') => setType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Đồ uống" value="drink" />
              <Picker.Item label="Hạt cà phê" value="bean" />
            </Picker>
            {type === 'drink' ? (
              <>
                <TextInput placeholder="Giá Size S" value={priceS} onChangeText={setPriceS} keyboardType="numeric" style={styles.input} />
                <TextInput placeholder="Giá Size M" value={priceM} onChangeText={setPriceM} keyboardType="numeric" style={styles.input} />
                <TextInput placeholder="Giá Size L" value={priceL} onChangeText={setPriceL} keyboardType="numeric" style={styles.input} />
              </>
            ) : (
              <>
                <TextInput placeholder="Giá 250g" value={price250g} onChangeText={setPrice250g} keyboardType="numeric" style={styles.input} />
                <TextInput placeholder="Giá 500g" value={price500g} onChangeText={setPrice500g} keyboardType="numeric" style={styles.input} />
                <TextInput placeholder="Giá 1kg" value={price1kg} onChangeText={setPrice1kg} keyboardType="numeric" style={styles.input} />
              </>
            )}
            <TextInput placeholder="Link Ảnh Sản Phẩm" value={image} onChangeText={setImage} style={styles.input} />
            <TextInput placeholder="Mô tả sản phẩm" value={mota} onChangeText={setMota} style={styles.input} />

            {/* Phần Tags */}
            <Text style={styles.tagLabel}>Tags:</Text>
            <View style={styles.tagContainer}>
              {availableTags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={[
                    styles.tagButton,
                    tags.includes(tag) ? styles.tagButtonSelected : null,
                  ]}
                  onPress={() => handleTagPress(tag)}
                >
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput placeholder="Roast Type" value={roastType} onChangeText={setRoastType} style={styles.input} />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={editingProduct ? handleUpdate : handleAdd}>
                <Text style={styles.modalButtonText}>{editingProduct ? 'Cập nhật' : 'Lưu'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal xác nhận xóa */}
      <Modal visible={deleteModalVisible} animationType='slide' transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Xác nhận xóa</Text>
            <Text style={styles.confirmText}>Bạn có chắc chắn muốn xóa sản phẩm này không?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setDeleteModalVisible(false)}>
                <Text style={styles.modalButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteConfirmButton]}
                onPress={() => {
                  if (productToDelete) {
                    handleDelete(productToDelete); // Xóa sản phẩm nếu người dùng đồng ý
                  }
                }}
              >
                <Text style={styles.modalButtonText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#000' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#fff' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#fff' },
  productCard: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
    width: '30%',
  },
  productImage: { width: 80, height: 80, marginBottom: 10, borderRadius: 10 },
  productName: { color: '#fff', textAlign: 'center' },
  productPrice: { color: '#fff', textAlign: 'center' },
  buttonContainer: { flexDirection: 'row', marginTop: 10 },
  button: { padding: 8, borderRadius: 5, marginHorizontal: 5 },
  editButton: { backgroundColor: "#3498db" },
  deleteButton: { backgroundColor: "#e74c3c" },
  addButton: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "center",
  },
  addButtonText: { color: "white", fontSize: 18, fontWeight: "bold", marginLeft: 5 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: '#fff',
  },
  confirmText: {
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  tagLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tagButton: {
    backgroundColor: '#666',
    padding: 8,
    borderRadius: 5,
    margin: 5,
  },
  tagButtonSelected: {
    backgroundColor: '#ffa500',
  },
  tagText: {
    color: '#fff',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
  },
  deleteConfirmButton: {
    backgroundColor: '#e74c3c',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Dashboard;