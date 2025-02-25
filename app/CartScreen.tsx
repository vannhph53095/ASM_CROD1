import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useCart } from './CartContext';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from './';

type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Detail: { products: Product };
  Register: undefined;
  Home: undefined;
  Favourite: undefined;
  Setting: undefined;
  Admin: undefined;
  Cart: undefined;
};

const CartScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { cart, dispatch } = useCart();

  const increaseQuantity = (id: string, size: string) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: { id, size } });
  };

  const decreaseQuantity = (id: string, size: string) => {
    const item = cart.items.find((item) => item.id === id);
    if (item) {
      if (item.type === 'drink') {
        const sizeItem = item.sizes?.find((s) => s.size === size);
        if (sizeItem) {
          dispatch({ type: 'DECREASE_QUANTITY', payload: { id, size } });

          // Kiểm tra xem tất cả các size của sản phẩm có quantity = 0 không
          const allSizesZero = item.sizes?.every((s) => s.quantity === 0);
          if (allSizesZero) {
            dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
            Alert.alert('Thông báo', 'Đã xóa sản phẩm khỏi giỏ hàng');
          }
        }
      } else if (item.type === 'bean') {
        const weightItem = item.weights?.find((w) => w.weight === size);
        if (weightItem) {
          dispatch({ type: 'DECREASE_QUANTITY', payload: { id, size } });

          // Kiểm tra xem tất cả các weight của sản phẩm có quantity = 0 không
          const allWeightsZero = item.weights?.every((w) => w.quantity === 0);
          if (allWeightsZero) {
            dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
            Alert.alert('Thông báo', 'Đã xóa sản phẩm khỏi giỏ hàng');
          }
        }
      }
    }
  };

  // Tính tổng giá trị giỏ hàng
  const totalPrice = cart.items.reduce((total, item) => {
    const itemTotal =
      item.type === 'drink'
        ? item.sizes?.reduce((sum, size) => sum + size.quantity * size.price, 0) || 0
        : item.weights?.reduce((sum, weight) => sum + weight.quantity * weight.price, 0) || 0;
    return total + itemTotal;
  }, 0);

  return (
    <View style={styles.container}>
      {/* Header giống HomeScreen */}
      <View style={styles.header1}>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Image style={styles.icon} source={require('../assets/images/app.png')} />
        </TouchableOpacity>
        <Image style={styles.icon1} source={require('../assets/images/Intersect.png')} />
      </View>

      {/* FlatList để hiển thị danh sách sản phẩm */}
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.imgvsname}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.textContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productSubtitle}>{item.subtitle}</Text>
              </View>
            </View>

            {item.type === 'drink' &&
              item.sizes?.map((size) => (
                <View key={size.size} style={styles.quantityContainer}>
                  <TextInput
                    style={[styles.size, styles.sizeText]}
                    value={size.size}
                    editable={false}
                  />
                  <Text style={styles.priceText}>${size.price.toFixed(2)}</Text>
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item.id, size.size)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.quantityInput}
                    value={size.quantity.toString()}
                    keyboardType="numeric"
                    editable={false}
                  />
                  <TouchableOpacity
                    onPress={() => increaseQuantity(item.id, size.size)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              ))}

            {item.type === 'bean' &&
              item.weights?.map((weight) => (
                <View key={weight.weight} style={styles.quantityContainer}>
                  <TextInput
                    style={[styles.size, styles.sizeText]}
                    value={weight.weight}
                    editable={false}
                  />
                  <Text style={styles.priceText}>${weight.price.toFixed(2)}</Text>
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item.id, weight.weight)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.quantityInput}
                    value={weight.quantity.toString()}
                    keyboardType="numeric"
                    editable={false}
                  />
                  <TouchableOpacity
                    onPress={() => increaseQuantity(item.id, weight.weight)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
        ListHeaderComponent={<Text style={styles.title}>Cart</Text>} // Tiêu đề của FlatList
        ListFooterComponent={<View style={{ height: 100 }} />} // Khoảng trống để tránh bị che bởi Total
      />

      {/* Phần Total cố định ở góc phải màn hình */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
      </View>

      {/* Phần navigation cố định ở dưới cùng */}
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Ionicons name="home" size={24} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart" size={24} color="#D17842" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favourite')}>
          <Ionicons name="heart" size={24} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications" size={24} color="#808080" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  cartItem: {
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  imgvsname: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 50,
  },
  textContainer: {
    flex: 1,
  },
  productName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  productSubtitle: {
    color: '#888',
    fontSize: 14,
  },
  sizeText: {
    marginRight: 50,
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  quantityButton: {
    backgroundColor: '#D17842',
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityInput: {
    backgroundColor: '#2c2c2c',
    color: '#fff',
    textAlign: 'center',
    width: 60,
    height: 40,
    borderRadius: 10,
    fontSize: 16,
    marginHorizontal: 8,
  },
  size: {
    backgroundColor: '#2c2c2c',
    color: '#fff',
    textAlign: 'center',
    width: 60,
    height: 40,
    borderRadius: 10,
    fontSize: 16,
    marginHorizontal: 8,
  },
  totalContainer: {
    position: 'absolute',
    bottom: 70, // Đặt phía trên thanh điều hướng
    right: 16,
    backgroundColor: '#1f1f1f',
    padding: 10,
    borderRadius: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  navigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  flatListContent: {
    paddingBottom: 100, // Khoảng trống để tránh bị che bởi Total và navigation
  },
  priceText:{
    color: '#fff',
    marginRight:20
  }
});

export default CartScreen;