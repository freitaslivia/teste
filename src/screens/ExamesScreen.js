import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

export default function ExamesScreen({ navigation, route }) {
    const [exames, setExames] = useState([]);
    const [expandedItem, setExpandedItem] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
  
    useEffect(() => {
      const fetchExames = async () => {
        try {
          const userId = await AsyncStorage.getItem('id');
          const response = await fetch(`https://yaso.azurewebsites.net/exames/${userId}`);
          const data = await response.json();
          setExames(data);
        } catch (error) {
          console.error('Erro ao buscar exames:', error);
        }
      };
  
      fetchExames();

      const intervalId = setInterval(fetchExames, 5000); // Atualiza a lista a cada 5 segundos

      return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
    }, []);
  
    const toggleItem = (itemId) => {
      setExpandedItem(expandedItem === itemId ? null : itemId);
    };
  
    const renderUploads = (uploads) => (
      uploads.map((upload, index) => (
        <Image key={index} source={{ uri: upload }} style={styles.thumbnail} />
      ))
    );
  
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={20} color="purple" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search-outline" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Exames</Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitleDown}>
            Caso precise encontrar um exame antigo ou atual, use o campo de pesquisa ou de filtro.
          </Text>
          {exames.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{item.nome}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => toggleItem(item.id)} style={styles.actionButton}>
                    <Ionicons name={expandedItem === item.id ? "chevron-up" : "chevron-down"} size={20} color="gray" />
                  </TouchableOpacity>
                </View>
              </View>
              {expandedItem === item.id && (
                <View style={styles.itemContentContainer}>
                  <Text style={styles.itemContent}>
                    {`Tipo: ${item.tipo}\nMedico: ${item.escala}`}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
  
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AdicionarExame')}>
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
  
        <Modal visible={!!selectedImage} transparent={true} animationType="fade">
          <View style={styles.modalBackground}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setSelectedImage(null)}>
              <Ionicons name="close-circle" size={30} color="white" />
            </TouchableOpacity>
            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.fullImage} />}
          </View>
        </Modal>
  
        <Footer navigation={navigation} />
      </View>
    );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '300', 
    color: 'purple',
    marginBottom: 10,
    marginTop: 20,
  },
  sectionTitleDown: {
    fontSize: 16,
    fontWeight: '300', 
    color: 'purple',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 15,
  },
  itemContainer: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    position: 'relative',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 14,
    color: 'purple',
    fontWeight: 'bold',
    flex: 1,
  },
  itemContentContainer: {
    marginTop: 10,
  },
  itemContent: {
    color: '#555555',
    fontSize: 12,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
  uploadItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 120,
    backgroundColor: 'purple',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 30,
    right: 30,
    zIndex: 1,
  },
  fullImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
});