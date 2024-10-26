import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe AsyncStorage

const { width } = Dimensions.get('window');

export default function Header() {
  const [greeting, setGreeting] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null); // Estado para armazenar o userId

  useEffect(() => {
    determineGreeting();
    fetchUserId(); // Chama a função para buscar o userId
  }, []);

  const determineGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 4) {
      setGreeting('Boa noite');
    } else if (hour >= 4 && hour < 12) {
      setGreeting('Bom dia');
    } else {
      setGreeting('Boa tarde');
    }
  };

  const fetchUserId = async () => {
    const id = await AsyncStorage.getItem('id'); // Obtém o ID do AsyncStorage
    if (id) {
      setUserId(id);
      fetchUserData(id); // Chama a função para buscar os dados do usuário
    }
  };

  const fetchUserData = async (id) => {
    try {
      const response = await fetch(`https://yaso.azurewebsites.net/users/${id}`);
      const data = await response.json();
      if (response.ok) {
        setUsername(data.username); // Define o nome do usuário retornado pela API
      } else {
        console.error('Erro ao buscar dados do usuário:', data);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6433A2', '#FAABFC']}
        style={styles.headerContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          {/* Logo */}
          <Image
            source={{ uri: 'https://i.ibb.co/84Ydb8b/logo.png' }}
            style={styles.logo}
          />
          {/* User info */}
          <View style={styles.userInfoContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.greeting}>{greeting}</Text>
              <Text style={styles.userName}>{username || 'Usuário'}</Text> {/* Usa o nome do usuário ou 'Usuário' como fallback */}
              <Text style={styles.userId}>Y24.36.25.53113</Text>
            </View>
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: 'https://i.ibb.co/x2XmdxN/isadora.jpg' }}
                style={styles.profileImage}
              />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>0</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.curvedBottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    paddingBottom: 60,
    paddingTop: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginRight: 10,
  },
  greeting: {
    color: 'white',
    fontSize: 10,
  },
  userName: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  userId: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  profileContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
  },
  notificationBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6b32a8',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
  },
  curvedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: 'white',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
});
