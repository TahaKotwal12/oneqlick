import React from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet } from 'react-native';
import { restaurants } from '../../restaurant/services/dummyData';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to OneQlick!</Text>
      <TextInput style={styles.search} placeholder="Search for restaurants or food..." />
      <Text style={styles.sectionTitle}>Featured Restaurants</Text>
      <FlatList
        data={restaurants}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.restaurantCard}>
            <Image source={{ uri: item.image }} style={styles.restaurantImage} />
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  welcome: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  search: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  restaurantCard: { marginRight: 16, width: 140, alignItems: 'center' },
  restaurantImage: { width: 120, height: 80, borderRadius: 8, marginBottom: 8 },
  restaurantName: { fontWeight: 'bold', fontSize: 16 },
  restaurantCuisine: { color: '#888' },
});

export default HomeScreen; 