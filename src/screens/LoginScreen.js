import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';  
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);  
  const [rememberLogin, setRememberLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://yaso.azurewebsites.net/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username, 
          password: password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('id', data.id.toString()); 
        console.log('Redirecionando para Home');
        navigation.navigate('Home'); 
      } else if (response.status === 400) {
        setErrorMessage('Usuário ou senha incorretos');
      } else {
        setErrorMessage('Erro desconhecido ao fazer login');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Erro ao conectar-se ao servidor');
    }
  };
  
  const handleEmergency = () => {
    navigation.navigate('Emergency');
  };

  const handleGooglePress = () => {
    navigation.navigate('Terms');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6433A2', '#FAABFC']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFillObject}
      />
      <Image source={require('../../assets/images/Yaso_1.png')} style={styles.logo} />
      <View style={styles.whiteBox}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Senha"
            placeholderTextColor="#ccc"
            secureTextEntry={!showPassword}  
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconContainer}>
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}  // Aumentado para melhorar a visibilidade
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={rememberLogin}
            onValueChange={setRememberLogin}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Lembrar meu login</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        <Text style={styles.orText}>ou</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../assets/images/Apple.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={handleGooglePress}>
            <Image source={require('../../assets/images/Google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleEmergency} style={styles.emergencyButton}>
        <Image source={require('../../assets/images/Emergency.png')} style={styles.emergencyIcon} />
        <Text style={styles.emergencyText}>Yaso Saúde</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
  },
  whiteBox: {
    width: '90%',
    height: '75%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  input: {
    width: '95%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    position: 'relative',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 15,
    zIndex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 12,
    color: '#555',
  },
  forgotPassword: {
    color: '#888',
    fontSize: 12,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    width: '95%',
    backgroundColor: '#6030A0',
    paddingVertical: 16,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  orText: {
    color: '#888',
    fontSize: 14,
    marginVertical: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  socialButton: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  emergencyButton: {
    alignItems: 'center',
    marginTop: 10,
    position: 'absolute',
    bottom: 30,
  },
  emergencyIcon: {
    width: 25,
    height: 25,
    marginBottom: 5,
  },
  emergencyText: {
    color: 'black',
    fontSize: 12,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    fontSize: 12,
  },
});

export default LoginScreen;
