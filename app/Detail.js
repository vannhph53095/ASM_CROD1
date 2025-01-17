import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

 export default Detail = () => {
  return (
    <ScrollView style={styles.container}>
  <View style={styles.imageContainer}>
    <Image
      source={require('../assets/images/Mask group (3).png')} 
      style={styles.image}
    />
    <View style={styles.overlay} /> {/* Overlay nền trong suốt */}
    <View style={styles.detailsOverlay}>
      <Text style={styles.title}>Robusta Beans</Text>
      <Text style={styles.subtitle}>From Africa</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>4.5</Text>
        <Text style={styles.reviewCount}>(6,879)</Text>
      </View>
    </View>
  </View>

  {/* Các phần khác */}
  <View style={styles.tagsContainer}>
    <Text style={styles.tag}>Bean</Text>
    <Text style={styles.tag}>Africa</Text>
    <Text style={styles.tag}>Medium Roasted</Text>
  </View>
  <Text style={styles.descriptionTitle}>Description</Text>
  <Text style={styles.description}>
    Arabica beans are by far the most popular type of coffee beans, making up about 60% of the world's coffee...
  </Text>
  <Text style={styles.sizeTitle}>Size</Text>
  <View style={styles.sizeContainer}>
    <TouchableOpacity style={[styles.sizeOption, styles.selectedSize]}>
      <Text style={styles.sizeText}>250gm</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.sizeOption}>
      <Text style={styles.sizeText}>500gm</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.sizeOption}>
      <Text style={styles.sizeText}>1000gm</Text>
    </TouchableOpacity>
  </View>
  <Text style={styles.price}>Price: $10.50</Text>
  <TouchableOpacity style={styles.addToCartButton}>
    <Text style={styles.addToCartText}>Add to Cart</Text>
  </TouchableOpacity>
</ScrollView>

  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
    },
    imageContainer: {
        position: 'relative',
       
        overflow: 'hidden', // Đảm bảo phần con không vượt ra ngoài
        backgroundColor: '#000', // Đặt màu nền để kiểm tra dễ hơn
      },
      
      image: {
        width: '100%',
        height: 600,
        resizeMode: 'cover', // Cắt ảnh phù hợp khung bo tròn
      },
      
      detailsOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      
    Overlay: {
      position: 'absolute',
      bottom: 0, 
      left: 0,
      right: 0,
      padding: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    subtitle: {
      fontSize: 16,
      color: '#BBBBBB',
      marginBottom: 8,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    rating: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFD700',
    },
    reviewCount: {
      fontSize: 14,
      color: '#BBBBBB',
      marginLeft: 4,
    },
    tagsContainer: {
      flexDirection: 'row',
      marginVertical: 8,
      paddingHorizontal: 16,
    },
    tag: {
      backgroundColor: '#333333',
      color: '#FFFFFF',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginRight: 8,
      fontSize: 12,
    },
    descriptionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginVertical: 8,
      paddingHorizontal: 16,
    },
    description: {
      fontSize: 14,
      color: '#BBBBBB',
      marginBottom: 16,
      paddingHorizontal: 16,
    },
    sizeTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 8,
      paddingHorizontal: 16,
    },
    sizeContainer: {
      flexDirection: 'row',
      marginBottom: 16,
      paddingHorizontal: 16,
    },
    sizeOption: {
      backgroundColor: '#333333',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      marginRight: 8,
    },
    selectedSize: {
      backgroundColor: '#FF8C00',
    },
    sizeText: {
      color: '#FFFFFF',
      fontSize: 14,
    },
    price: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 16,
      paddingHorizontal: 16,
    },
    addToCartButton: {
      backgroundColor: '#FF8C00',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 16,
      marginBottom: 16,
    },
    addToCartText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
  });
  