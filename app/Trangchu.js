import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
export default function App() {
  const navigation=useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);  // Lưu trạng thái của lựa chọn

  const handleSelectOption = (option) => {
    setSelectedOption(option);  // Cập nhật lựa chọn khi người dùng chọn
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Find the best coffee for you</Text>
        <Ionicons name="person-circle-outline" size={30} color="white" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="gray" />
        <TextInput placeholder="Find your coffee..." placeholderTextColor="gray" style={styles.searchInput} />
      </View>

      {/* Tabs */}
      <View horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
        {["All", "Cappuccino", "Espresso", "Americano", "Mocha"].map((category, index) => (
          <Text key={index} style={index === 0 ? styles.activeTab : styles.tab}>
            {category}
          </Text>
        ))}
      </View>

      <ScrollView style={styles.cardContainer}>
        <Text style={styles.sectionTitle}>Coffee</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
       
          <View style={styles.card}>
            <Image source={require('../assets/images/Group 10 (1).png')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Cappuccino</Text>
            <Text style={{color:'white'}}>With Steamed Milk</Text>
            <View style={styles.optionsContainer} />

           
            <View style={styles.priceContainer}>
              <Text style={styles.cardSubtitle}>$4.20</Text>
              <TouchableOpacity style={styles.addToCart}>
                <Ionicons name="cart-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <Image source={require('../assets/images/Group 10.png')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Cappuccino</Text>
            <Text style={{color:'white'}}>With Foam</Text>
            <View style={styles.optionsContainer} />

            <View style={styles.priceContainer}>
              <Text style={styles.cardSubtitle}>$4.20</Text>
              <TouchableOpacity style={styles.addToCart}>
                <Ionicons name="cart-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <Image source={require('../assets/images/Group 10 (1).png')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Cappuccino</Text>
            <Text style={{ color: 'white' }}>With Steamed Milk</Text>

            <View style={styles.optionsContainer} />

           
            <View style={styles.priceContainer}>
              <Text style={styles.cardSubtitle}>$4.20</Text>
              <TouchableOpacity style={styles.addToCart}>
                <Ionicons name="cart-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

      
        <Text style={styles.sectionTitle}>Coffee Beans</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
         
          <View style={styles.card}>
            <Image source={require('../assets/images/Mask group (1).png')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Arabica Beans</Text>
           

            <Text style={styles.cardNote}>With cream</Text>

            <View style={styles.priceContainer}>
  <Text style={styles.cardSubtitle}>$4.20</Text>
  <TouchableOpacity onPress={()=>navigation.navigate('Detail')}  style={styles.addToCart}>
    <Ionicons name="cart-outline" size={20} color="white" />
  </TouchableOpacity>
</View>
</View>

          <View style={styles.card}>
            <Image source={require('../assets/images/Mask group (2).png')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Arabica Beans</Text>
          

            <Text style={styles.cardNote}>With cream</Text>

<View style={styles.priceContainer}>
  <Text style={styles.cardSubtitle}>$4.20</Text>
  <TouchableOpacity onPress={()=>navigation.navigate('Detail')}  style={styles.addToCart}>
    <Ionicons name="cart-outline" size={20} color="white" />
  </TouchableOpacity>
</View>
</View>

          <View style={styles.card}>
            <Image source={require('../assets/images/Mask group (1).png')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Arabica Beans</Text>
            
            <Text style={styles.cardNote}>With cream</Text>
            <View style={styles.optionsContainer} />


<View style={styles.priceContainer}>
  <Text style={styles.cardSubtitle}>$4.20</Text>
  <TouchableOpacity style={styles.addToCart}>
    <Ionicons name="cart-outline" size={20} color="white" />
  </TouchableOpacity>
</View>
</View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e",
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2c2c2e",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    color: "white",
    flex: 1,
    paddingVertical: 10,
    marginLeft: 10,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    color: "gray",
    marginRight: 15,
    fontSize: 16,
  },
  activeTab: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 15,
  },
  cardContainer: {
    flex: 1,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#2c2c2e",
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    width: 150,
  },
  cardImage: {
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    color: "white",
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardNote: {
    color: "lightgray",
    fontSize: 12,
    marginBottom: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: "#3c3c3e",
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  optionText: {
    color: "gray",
    fontSize: 12,
  },
  selectedOption: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  addToCart: {
    padding: 5,
    backgroundColor: "#ff9500",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: "auto",  
  },
});
