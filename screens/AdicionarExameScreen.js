import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AdicionarExameScreen({ navigation, route }) {
  const [nomeExame, setNomeExame] = useState('');
  const [tipoExame, setTipoExame] = useState('');
  const [medicoSolicitante, setMedicoSolicitante] = useState('');
  const [descricao, setDescricao] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (route.params?.item) {
      const { nomeExame, tipoExame, medicoSolicitante, descricao, file} = route.params.item;
      setNomeExame(nomeExame);
      setTipoExame(tipoExame)
      setMedicoSolicitante(medicoSolicitante)
      setDescricao(descricao)
      setFile(file);
    }
  }, [route.params?.item]);


  const selecionarImagem = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Erro', 'Permissão para acessar a galeria de imagens é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFile(result.assets[0].uri);
    }
  };

  const salvarExame = async () => {
    const id = await AsyncStorage.getItem('id');  
    if (!id) {
      Alert.alert('Erro', 'ID do usuário não encontrado');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nomeExame);
    formData.append('tipo', tipoExame);
    formData.append('escala', medicoSolicitante);
    formData.append('descricao', descricao);
    formData.append('idUsuario', id); 

    if (file) {
      formData.append('ifile', {
        uri: file,
        type: 'image/jpeg',
        name: 'exame.jpg',
      });
    }

    try {
      const response = await fetch('https://yaso.azurewebsites.net/exames', {
        method: 'POST',
        body: formData,
        headers: {},
      });
  
      if (response.ok) {
        const data = await response.json();
        Alert.alert('Sucesso', 'Exame cadastrada com sucesso!');
        navigation.navigate('Exames', { newItem: data });
      } else {
        const error = await response.json();
        Alert.alert('Erro', error.message || 'Erro ao cadastrar Exame');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar a Exame.');
      console.error('Erro ao salvar Exame:', error);
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

        <Text style={styles.sectionTitle}>Adicionar um novo exame</Text>

        <Text style={styles.inputLabel}>Nome do exame</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          value={nomeExame}
          onChangeText={setNomeExame}
        />

        <Text style={styles.inputLabel}>Tipo de exame</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o tipo"
          value={tipoExame}
          onChangeText={setTipoExame}
        />

        <Text style={styles.inputLabel}>Médico solicitante</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o médico"
          value={medicoSolicitante}
          onChangeText={setMedicoSolicitante}
        />

        <Text style={styles.inputLabel}>Descrição do exame</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a descrição"
          value={descricao}
          onChangeText={setDescricao}
        />

        <Text style={styles.inputLabel}>Imagens do exame</Text>
        <TouchableOpacity style={styles.imageContainer} onPress={selecionarImagem}>
          {file ? (
            <Image source={{ uri: file }} style={styles.image} />
          ) : (
            <Ionicons name="camera" size={50} color="gray" />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={salvarExame}>
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
