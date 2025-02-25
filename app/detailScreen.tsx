import React, { useState } from 'react';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './index';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useCart, CartItem } from './CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  subtitle: string;
  image: string;
  rating: number;
  reviews: number;
  sizes?: { size: string; price: number }[];
  weights?: { weight: string; price: number }[];
  tags: string[];
  roastType: string;
  type: 'drink' | 'bean';
  favorite?: boolean;
}

// Type guard để kiểm tra kiểu dữ liệu của selectedOption
const isDrink = (
  option: { size: string; price: number } | { weight: string; price: number }
): option is { size: string; price: number } => {
  return (option as { size: string; price: number }).size !== undefined;
};

const CoffeeDetails = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { products } = route.params as { products: Product };
  const [selectedOption, setSelectedOption] = useState(
    products.type === "drink" ? products.sizes![0] : products.weights![0]
  );
  const [isFavorite, setIsFavorite] = useState(products.favorite || false);
  const { dispatch } = useCart();

  // Hàm cập nhật trạng thái yêu thích
  const toggleFavorite = async () => {
    try {
      const response = await fetch(`http://192.168.2.6:3000/products/${products.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorite: !isFavorite }),
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
        Alert.alert('Thông báo', isFavorite ? 'Đã xóa khỏi yêu thích' : 'Đã thêm vào yêu thích');
      } else {
        Alert.alert('Lỗi', 'Không thể cập nhật trạng thái yêu thích');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái yêu thích:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật trạng thái yêu thích');
    }
  };

  const handleAddToCart = () => {
    if (products.type === 'drink' && products.sizes) {
      const selectedSize = isDrink(selectedOption) ? selectedOption.size : '';
      const cartItem: CartItem = {
        id: products.id,
        name: products.name,
        subtitle: products.subtitle,
        image: products.image,
        type: 'drink',
        sizes: products.sizes.map((size) => ({
          size: size.size,
          quantity: size.size === selectedSize ? 1 : 0,
          price: size.price,
        })),
      };
      dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    } else if (products.type === 'bean' && products.weights) {
      const selectedWeight = isDrink(selectedOption) ? '' : selectedOption.weight;
      const cartItem: CartItem = {
        id: products.id,
        name: products.name,
        subtitle: products.subtitle,
        image: products.image,
        type: 'bean',
        weights: products.weights.map((weight) => ({
          weight: weight.weight,
          quantity: weight.weight === selectedWeight ? 1 : 0,
          price: weight.price,
        })),
      };
      dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    }
    Alert.alert('Thông báo', 'Đã thêm vào giỏ hàng');
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={{ uri: products.image }} style={styles.imageBackground}>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Main')}>
            <Image source={require('../assets/images/back.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
            <Image 
              source={require('../assets/images/love.png')} 
              style={[styles.icon1, { tintColor: isFavorite ? '#EE0000' : '#52555A' }]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.opacity}>
          <View>
            <Text style={styles.title}>{products.name}</Text>
            <Text style={styles.subtitle}>{products.subtitle}</Text>
            <Text style={styles.rating}>⭐ {products.rating} ({products.reviews})</Text>
          </View>
          <View style={styles.row}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.tag}>
                <Image
                  source={require('../assets/images/Group 19.png')}
                  style={styles.tagIcon}
                />
                <Text style={styles.tagText}>{products.tags[0]}</Text>
              </View>
              <View style={styles.tag}>
                <Image
                  source={require('../assets/images/drop.png')}
                  style={styles.tagIcon}
                />
                <Text style={styles.tagText}>{products.tags[1]}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.detailsContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{products.description}</Text>

        <Text style={styles.sizeTitle}>
          {products.type === "drink" ? "Chọn kích thước" : "Chọn định lượng"}
        </Text>
        <View style={styles.sizeOptions}>
          {products.type === "drink"
            ? products.sizes?.map((size, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sizeButton,
                    isDrink(selectedOption) && selectedOption.size === size.size && styles.selectedSizeButton,
                  ]}
                  onPress={() => setSelectedOption(size)}>
                  <Text
                    style={[
                      styles.sizeText,
                      isDrink(selectedOption) && selectedOption.size === size.size && styles.selectedSizeText,
                    ]}>
                    {size.size}
                  </Text>
                </TouchableOpacity>
              ))
            : products.weights?.map((weight, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sizeButton,
                    !isDrink(selectedOption) && selectedOption.weight === weight.weight && styles.selectedSizeButton,
                  ]}
                  onPress={() => setSelectedOption(weight)}>
                  <Text
                    style={[
                      styles.sizeText,
                      !isDrink(selectedOption) && selectedOption.weight === weight.weight && styles.selectedSizeText,
                    ]}>
                    {weight.weight}
                  </Text>
                </TouchableOpacity>
              ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>${selectedOption.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  sizeText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  tagIcon: { width: 20, height: 20 },
  imageBackground: { height: 500, justifyContent: 'space-between' },
  headerIcons: { flexDirection: 'row', justifyContent: 'space-between', padding: 15 },
  backButton: { width: 25, height: 25, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  favoriteButton: { width: 25, height: 25, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  icon: { width: 15, height: 15, tintColor: '#52555A' },
  icon1: { width: 15, height: 15 },
  detailsContainer: { borderTopLeftRadius: 25, borderTopRightRadius: 25, marginTop: -25, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 16, color: '#aaa', marginVertical: 5 },
  row: {},
  tag: { width: 70, height: 70, alignItems: 'center', backgroundColor: '#141921', borderRadius: 15, justifyContent: 'center', marginRight: 10 },
  tagText: { color: '#fff', fontSize: 12, marginTop: 5 },
  tagTitle: { width: 150, height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#141921', marginTop: 10 },
  rating: { fontSize: 14, color: '#fff', marginVertical: 10 },
  descriptionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginTop: 20 },
  description: { fontSize: 14, color: '#aaa', marginVertical: 10, lineHeight: 20 },
  sizeTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginTop: 20 },
  sizeOptions: { flexDirection: 'row', marginVertical: 10 },
  sizeButton: { borderWidth: 1, borderColor: '#555', borderRadius: 15, paddingHorizontal: 20, paddingVertical: 10, marginRight: 10 },
  selectedSizeButton: { backgroundColor: '#ff6600' },
  selectedSizeText: { color: '#fff', fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  price: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  cartButton: { backgroundColor: '#D17842', borderRadius: 15, paddingHorizontal: 20, paddingVertical: 10 },
  cartButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  opacity: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(12, 15, 20, 0.5)', borderTopLeftRadius: 25, borderTopRightRadius: 25, marginTop: -25, padding: 20, width: '100%' },
});

export default CoffeeDetails;