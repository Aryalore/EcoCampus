import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import API from './api/axiosConfig';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.log("Hata:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProducts();
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={[styles.badge, { backgroundColor: parseFloat(item.price) === 0 ? '#DCFCE7' : '#F1F5F9' }]}>
          <Text style={[styles.price, { color: parseFloat(item.price) === 0 ? '#15803D' : '#1E293B' }]}>
            {parseFloat(item.price) === 0 ? "BAĞIŞ" : `${item.price} TL`}
          </Text>
        </View>
      </View>
      <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.footerText}>📍 Kampüs İçi Teslimat</Text>
        <Text style={styles.categoryBadge}>Kitap/Materyal</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#10b981" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 15 }}
          ListEmptyComponent={<Text style={styles.empty}>Henüz ilan yok, ilk ilanı sen ver!</Text>}
        />
      )}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddProduct')}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  card: { backgroundColor: '#FFFFFF', padding: 20, marginBottom: 15, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: 17, fontWeight: '700', color: '#0F172A', flex: 1, marginRight: 10 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  price: { fontSize: 13, fontWeight: '800' },
  desc: { color: '#64748B', fontSize: 14, marginTop: 8, lineHeight: 20 },
  cardFooter: { marginTop: 15, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9', flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 11, color: '#94A3B8', fontWeight: '500' },
  categoryBadge: { fontSize: 10, color: '#64748B', backgroundColor: '#F1F5F9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#10B981', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#10B981', shadowOpacity: 0.3 },
  fabText: { color: 'white', fontSize: 35, fontWeight: '300', marginTop: -4 },
  empty: { textAlign: 'center', marginTop: 50, color: '#94A3B8' }
});