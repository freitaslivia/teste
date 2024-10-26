import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdicionarVacinaScreen({ navigation, route }) {
    const [nome, setNome] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [data, setData] = useState('');
    const [comprovante, setComprovante] = useState(null);
    const [titulo, setTitulo] = useState('');
  
    useEffect(() => {
      if (route.params?.item) {
        const { nome, responsavel, data, comprovante } = route.params.item;
        setNome(nome);
        setResponsavel(responsavel);
        setData(data);
        setComprovante(comprovante);
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
          setComprovante(localUri);
        }
      };
      
  
      const salvarVacina = async () => {
        const id = await AsyncStorage.getItem('id');  
        if (!id) {
          Alert.alert('Erro', 'ID do usuário não encontrado');
          return;
        }
      
        let formData = new FormData();
        if (nome) formData.append('nome', nome);
        if (data) formData.append('dataAplicacao', data);
        if (titulo) formData.append('titulo', titulo);
        if (responsavel) formData.append('responsavel', responsavel);
        formData.append('idUsuario', id);
      
        if (comprovante) {
          const localUri = comprovante; 
          const filename = localUri.split('/').pop();
          const match = /\.(\w+)$/.exec(filename); 
          const fileType = match ? `image/${match[1]}` : `image`; 
      
          formData.append('comprovante', {
            uri: localUri, 
            name: filename, 
            type: fileType, 
          });
        }
      
        try {
          const response = await fetch('https://yaso.azurewebsites.net/vacinas', {
            method: 'POST',
            body: formData,
            headers: {},
          });
      
          if (response.ok) {
            const data = await response.json();
            Alert.alert('Sucesso', 'Vacina cadastrada com sucesso!');
            navigation.navigate('Vacinas', { newItem: data });
          } else {
            const error = await response.json();
            Alert.alert('Erro', error.message || 'Erro ao cadastrar vacina');
          }
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível cadastrar a vacina.');
          console.error('Erro ao salvar vacina:', error);
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
  
          <Text style={styles.sectionTitle}>adicionar uma nova vacina</Text>
  
          <Text style={styles.inputLabel}>Título (opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o título"
            value={titulo}
            onChangeText={setTitulo}
          />
  
          <Text style={styles.inputLabel}>Nome da vacina</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome da vacina"
            value={nome}
            onChangeText={setNome}
          />
  
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Data</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                value={data}
                onChangeText={setData}
              />
            </View>
          </View>
  
          <Text style={styles.inputLabel}>Responsável pela aplicação</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o responsável pela aplicação"
            value={responsavel}
            onChangeText={setResponsavel}
          />
  
          <Text style={styles.inputLabel}>Foto do comprovante</Text>
          <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
            {comprovante ? (
                <Image source={{ uri: comprovante }} style={styles.image} />
            ) : (
                <Ionicons name="camera" size={50} color="gray" />
            )}
            </TouchableOpacity>

  
          <TouchableOpacity style={styles.saveButton} onPress={salvarVacina}>
            <Text style={styles.saveButtonText}>Salvar</Text>
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
