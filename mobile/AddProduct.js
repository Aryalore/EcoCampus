import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import API from './api/axiosConfig';

export default function AddProduct({ navigation }) {
  const [form, setForm] = useState({ title: '', price: '', desc: '' });

  const handleAdd = async () => {
    if (!form.title || !form.price) return Alert.alert("Hata", "Lütfen alanları doldurun.");
    
    try {
      await API.post('/products', {
        title: form.title,
        price: parseFloat(form.price),
        description: form.desc,
        category_id: 1 // Varsayılan kategori
      });
      Alert.alert("Başarılı", "İlan web panelinde de görünecek!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Hata", "Gönderilemedi. IP adresinizi kontrol edin.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Ürün Adı" style={styles.input} onChangeText={(t) => setForm({...form, title: t})} />
      <TextInput placeholder="Fiyat (Bağış için 0)" keyboardType="numeric" style={styles.input} onChangeText={(t) => setForm({...form, price: t})} />
      <TextInput placeholder="Açıklama" multiline style={[styles.input, { height: 100 }]} onChangeText={(t) => setForm({...form, desc: t})} />
      <TouchableOpacity style={styles.btn} onPress={handleAdd}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>YAYINLA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  btn: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 8 }
});