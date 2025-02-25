import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './index';
import { Product } from './index';
import { Ionicons } from '@expo/vector-icons';

type FavouriteRouteProp = RouteProp<RootStackParamList, 'Favourite'>;
type FavouriteNavigationProp = NavigationProp<RootStackParamList, 'Favourite'>;

const Favourite = () => {
  const route = useRoute<FavouriteRouteProp>();
  const navigation = useNavigation<FavouriteNavigationProp>();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  // Fetch danh sách sản phẩm yêu thích từ server
  useEffect(() => {
    fetch('http://192.168.2.6:3000/products')
      .then((response) => response.json())
      .then((data) => {
        const favorites = data.filter((product: Product) => product.favorite);
        setFavoriteProducts(favorites);
      })
      .catch((error) => console.log('Lỗi data ', error));
  }, []);

  // Hàm cập nhật trạng thái yêu thích
  const toggleFavorite = async (id: string) => {
    try {
      // Tìm sản phẩm cần cập nhật
      const productToUpdate = favoriteProducts.find((product) => product.id === id);
      if (!productToUpdate) return;

      // Gửi yêu cầu PATCH để cập nhật trạng thái favorite
      const response = await fetch(`http://192.168.2.6:3000/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorite: !productToUpdate.favorite }),
      });

      if (response.ok) {
        // Cập nhật danh sách sản phẩm yêu thích
        const updatedProduct = await response.json();
        const updatedFavorites = favoriteProducts.map((product) =>
          product.id === id ? updatedProduct : product
        );
        setFavoriteProducts(updatedFavorites.filter((product) => product.favorite));

        // Hiển thị thông báo
        Alert.alert('Thông báo', updatedProduct.favorite ? 'Đã thêm vào yêu thích' : 'Đã xóa khỏi yêu thích');
      } else {
        Alert.alert('Lỗi', 'Không thể cập nhật trạng thái yêu thích');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái yêu thích:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật trạng thái yêu thích');
    }
  };

  // Render mỗi sản phẩm trong danh sách yêu thích
  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', { products: item })}
      style={styles.productCard}
    >
      <ImageBackground source={{ uri: item.image }} style={styles.productImage}>
        <View style={styles.opacity}>
          <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <Text style={styles.rating}>⭐ {item.rating} ({item.reviews})</Text>
          </View>
          <View>
            <View style={styles.tag}>
              <Image
                source={require('../assets/images/Group 19.png')}
                style={styles.tagIcon}
              />
              <Text style={styles.tagText}>{item.tags[0]}</Text>
            </View>
            <View style={styles.tag}>
              <Image
                source={require('../assets/images/drop.png')}
                style={styles.tagIcon}
              />
              <Text style={styles.tagText}>{item.tags[1]}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.detailsContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      {/* Nút trái tim để thay đổi trạng thái yêu thích */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Ionicons
          name="heart"
          size={24}
          color={item.favorite ? '#D17842' : '#808080'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header giống HomeScreen */}
      <View style={styles.header1}>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Image style={styles.icon} source={require('../assets/images/app.png')} />
        </TouchableOpacity>
        <Image style={styles.icon1} source={require('../assets/images/Intersect.png')} />
      </View>


        <FlatList
          data={favoriteProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
        />
   

      {/* Phần navigation cố định ở dưới cùng */}
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Ionicons name="home" size={24} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart" size={24} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart" size={24} color="#D17842" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications" size={24} color="#808080" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 
  header1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  icon: {
    width: 20,
    height: 20,
  },
  icon1: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 70, // Để tránh bị navigation che
  },
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  productCard: {
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
  },
  opacity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(12, 15, 20, 0.5)',
    padding: 16,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 16, color: '#aaa', marginVertical: 5 },
  rating: { fontSize: 14, color: '#fff', marginVertical: 10 },
  detailsContainer: { borderTopLeftRadius: 25, borderTopRightRadius: 25, marginTop: -25, padding: 20 },
  descriptionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginTop: 20 },
  description: { fontSize: 14, color: '#aaa', marginVertical: 10, lineHeight: 20 },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141921',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  tagIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default Favourite;