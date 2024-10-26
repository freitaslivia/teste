import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AdicionarConsultaScreen({ navigation }) {
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [endereco, setEndereco] = useState('');
  const [medico, setMedico] = useState('');
  const [crm, setCrm] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [telefone, setTelefone] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async () => {
    const id = await AsyncStorage.getItem('id');  
    if (!id) {
      Alert.alert('Erro', 'ID do usuário não encontrado');
      return;
    }

    const formData = new FormData();
    formData.append('data', data);
    formData.append('hora', hora);
    formData.append('endereco', endereco);
    formData.append('medico', medico);
    formData.append('crm', crm);
    formData.append('especialidade', especialidade);
    formData.append('telefone', telefone);
    formData.append('descricao', descricao);
    formData.append('idUsuario', id);
  
    console.log('Enviando dados:', formData);
  
    try {
      const response = await fetch('https://yaso.azurewebsites.net/consultas', {
        method: 'POST',
        headers: {
        },
        body: formData,
      });
  
      if (response.ok) {
        Alert.alert('Sucesso', 'Consulta cadastrada com sucesso');
        navigation.goBack();
      } else {
        const errorData = await response.json();
        console.error('Erro na resposta:', errorData);
        Alert.alert('Erro', `Falha ao cadastrar consulta: ${JSON.stringify(errorData)}`);
      }
    } catch (e) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar cadastrar a consulta');
      console.error(e);
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

        <Text style={styles.sectionTitle}>adicionar uma nova consulta</Text>

        <Text style={styles.inputLabel}>Data da consulta</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a data"
          value={data}
          onChangeText={setData}
        />

        <Text style={styles.inputLabel}>Hora da consulta</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a hora"
          value={hora}
          onChangeText={setHora}
        />

        <Text style={styles.inputLabel}>Endereço da consulta</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o endereço"
          value={endereco}
          onChangeText={setEndereco}
        />

        <Text style={styles.inputLabel}>Médico da consulta</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o médico"
          value={medico}
          onChangeText={setMedico}
        />

        <Text style={styles.inputLabel}>CRM</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o CRM"
          value={crm}
          onChangeText={setCrm}
        />

        <Text style={styles.inputLabel}>Especialidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a especialidade"
          value={especialidade}
          onChangeText={setEspecialidade}
        />

        <Text style={styles.inputLabel}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o telefone"
          value={telefone}
          onChangeText={setTelefone}
        />

        <Text style={styles.inputLabel}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a descrição"
          value={descricao}
          onChangeText={setDescricao}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
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
