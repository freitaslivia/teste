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
import Header from '../components/Header';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function AdicionarMedicamentoScreen({ navigation, route }) {
  const [nomeMedicamento, setNomeMedicamento] = useState('');
  const [tipoMedicamento, setTipoMedicamento] = useState('');
  const [data, setData] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [medicoSolicitante, setMedicoSolicitante] = useState('');
  const [file, setFile] = useState(null);


  
  useEffect(() => {
    if (route.params?.item) {
      const { nomeMedicamento, tipoMedicamento, data, dosagem, periodo, medicoSolicitante, file} = route.params.item;
      setNomeMedicamento(nomeMedicamento);
      setTipoMedicamento(tipoMedicamento)
      setData(data)
      setDosagem(dosagem)
      setPeriodo(periodo)
      setMedicoSolicitante(medicoSolicitante)
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
    

  const salvarMedicamento = async () => {
    const id = await AsyncStorage.getItem('id');  
    if (!id) {
      Alert.alert('Erro', 'ID do usuário não encontrado');
      return;
    }
    let formData = new FormData();
    
    if (nomeMedicamento) formData.append('nome', nomeMedicamento);
    if (tipoMedicamento) formData.append('tipo', tipoMedicamento);
    if (data) formData.append('data', data);
    if (dosagem) formData.append('dosagem', dosagem);
    if (periodo) formData.append('periodo', periodo);
    if (medicoSolicitante) formData.append('medico', medicoSolicitante);
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
      const response = await fetch('https://yaso.azurewebsites.net/medicamentos', {
        method: 'POST',
        body: formData,
        headers: {
        },
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Sucesso', 'Medicamento cadastrado com sucesso!');
        navigation.navigate('Medicamentos', { newItem: data });
      } else {
        const error = await response.json();
        Alert.alert('Erro', error.message || 'Erro ao cadastrar medicamento');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o medicamento.');
      console.error('Erro ao salvar medicamento:', error);
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

        <Text style={styles.sectionTitle}>Adicionar um novo medicamento</Text>

        <Text style={styles.inputLabel}>Nome do medicamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          value={nomeMedicamento}
          onChangeText={setNomeMedicamento}
        />

        <Text style={styles.inputLabel}>Tipo de medicamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o tipo"
          value={tipoMedicamento}
          onChangeText={setTipoMedicamento}
        />

        <Text style={styles.inputLabel}>Data</Text>
        <TextInput
          style={styles.input}
          placeholder="00/00/0000"
          value={data}
          onChangeText={setData}
        />

        <Text style={styles.inputLabel}>Dosagem</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={dosagem}
          onChangeText={setDosagem}
        />

        <Text style={styles.inputLabel}>Período</Text>
        <TextInput
          style={styles.input}
          placeholder="Uso contínuo"
          value={periodo}
          onChangeText={setPeriodo}
        />

        <Text style={styles.inputLabel}>Médico solicitante</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o médico"
          value={medicoSolicitante}
          onChangeText={setMedicoSolicitante}
        />

      <Text style={styles.inputLabel}>foto</Text>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {file ? (
            <Image source={{ uri: file }} style={styles.image} />
          ) : (
            <Ionicons name="camera" size={50} color="gray" />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={salvarMedicamento}>
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
      marginBottom: 50,
      flexGrow: 1,
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
  