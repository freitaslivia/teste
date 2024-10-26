import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdicionarAlergiaScreen({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [escala, setEscala] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cuidado, setCuidado] = useState('');
  const [file, setFile] = useState(null);


  useEffect(() => {
    if (route.params?.item) {
      const { nome, tipo, escala, descricao, cuidado, file} = route.params.item;
      setNome(nome);
      setTipo(tipo)
      setEscala(escala)
      setDescricao(descricao)
      setCuidado(cuidado)
      setFile(file);
    }
  }, [route.params?.item]);
  

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos da permissão para acessar suas fotos!');
      }
    };
    getPermissions();
  }, []);

  const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    
      if (!result.canceled) {
        const localUri = result.assets[0].uri;
        setFile(localUri);
      }
    };
    

    const salvar = async () => {
      const id = await AsyncStorage.getItem('id');  
      if (!id) {
        Alert.alert('Erro', 'ID do usuário não encontrado');
        return;
      }
    
      let formData = new FormData();
      if (nome) formData.append('nome', nome);
      if (tipo) formData.append('tipo', tipo);
      if (escala) formData.append('escala', escala);
      if (descricao) formData.append('descricao', descricao);
      if (cuidado) formData.append('cuidados', cuidado);
      formData.append('idUsuario', id);
    
      if (file) {
        const localUri = file; 
        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename); 
        const fileType = match ? `image/${match[1]}` : `image`; 
    
        formData.append('file', {
          uri: localUri, 
          name: filename, 
          type: fileType, 
        });
      }
    
      try {
        const response = await fetch('https://yaso.azurewebsites.net/alergias', {
          method: 'POST',
          body: formData,
          headers: {},
        });
    
        if (response.ok) {
          const data = await response.json();
          Alert.alert('Sucesso', 'Alergia cadastrada com sucesso!');
          navigation.navigate('Alergias', { newItem: data });
        } else {
          const error = await response.json();
          Alert.alert('Erro', error.message || 'Erro ao cadastrar Alergia');
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível cadastrar a Alergia.');
        console.error('Erro ao salvar Alergia:', error);
      }
    };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={20} color="purple" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>adicionar uma nova alergia</Text>

        <Text style={styles.inputLabel}>Nome da alergia</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.inputLabel}>Tipo de alergia</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o tipo"
          value={tipo}
          onChangeText={setTipo}
        />


        <Text style={styles.inputLabel}>Escala da alergia</Text>
        <TextInput
              style={styles.input}
              placeholder="Digite a escala"
              value={escala}
              onChangeText={setEscala}
            />


        <Text style={styles.inputLabel}>Descrição da alergia</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a descrição"
          value={descricao}
          onChangeText={setDescricao}
        />

        <Text style={styles.inputLabel}>Cuidados conhecidos</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite os cuidados"
          value={cuidado}
          onChangeText={setCuidado}
        />


        <Text style={styles.inputLabel}>foto da alergia</Text>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {file ? (
            <Image source={{ uri: file }} style={styles.image} />
          ) : (
            <Ionicons name="camera" size={50} color="gray" />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={salvar}>
          <Text style={styles.saveButtonText}>salvar</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 20,
    marginTop: 20, 
  },
  inputLabel: {
    fontSize: 14,
    color: 'purple',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 14,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '48%',
  },
  imageContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: 'purple',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
