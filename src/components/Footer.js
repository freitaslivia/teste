import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native'; // Adicione o Image aqui
import { useNavigation } from '@react-navigation/native';
export default function Footer() {
  const navigation = useNavigation(); 
  const [modalVisible, setModalVisible] = useState(false);
  const [keyModalVisible, setKeyModalVisible] = useState(false);
  const [homeModalVisible, setHomeModalVisible] = useState(false);
  const [docModalVisible, setDocModalVisible] = useState(false);
  const [medicalOptionsModalVisible, setMedicalOptionsModalVisible] = useState(false);

  const openConfigModal = () => {
    setModalVisible(true);
  };

  const closeConfigModal = () => {
    setModalVisible(false);
  };

  const openKeyModal = () => {
    setKeyModalVisible(true);
  };

  const closeKeyModal = () => {
    setKeyModalVisible(false);
  };

  const openHomeModal = () => {
    setHomeModalVisible(true);
  };

  const closeHomeModal = () => {
    setHomeModalVisible(false); 
  };

  const openDocModal = () => {
    setDocModalVisible(true);
  };

  const closeDocModal = () => {
    setDocModalVisible(false);
  };

  const openMedicalOptionsModal = () => {
    setMedicalOptionsModalVisible(true);
  };

  const closeMedicalOptionsModal = () => {
    setMedicalOptionsModalVisible(false);
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={openMedicalOptionsModal}>
        <Image
          source={{ uri: 'https://i.ibb.co/16GqcWc/pessoa.png' }}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openDocModal}>
        <Image
          source={{ uri: 'https://i.ibb.co/MGmJnMW/folha.png' }} 
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openHomeModal}>
        <Image
          source={{ uri: 'https://i.ibb.co/T2Hn4zq/home.png' }} 
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openKeyModal}>
        <Image
          source={{ uri: 'https://i.ibb.co/HN1BGCy/chave.png' }}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openConfigModal}>
        <Image
          source={{ uri: 'https://i.ibb.co/XJPLLv6/menu-more.png' }}
          style={{ width: 30, height: 30 }} 
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeConfigModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => { alert('Segurança e privacidade'); closeConfigModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Segurança e privacidade</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { alert('Dispositivos'); closeConfigModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Dispositivos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { alert('Permissões'); closeConfigModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Permissões</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { alert('Meu perfil'); closeConfigModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Meu perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { alert('Notificações'); closeConfigModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Notificações</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { alert('Configurações'); closeConfigModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Configurações</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeConfigModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={keyModalVisible}
        onRequestClose={closeKeyModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => { alert('Segurança'); closeKeyModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Segurança</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { alert('Modo de emergência'); closeKeyModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Modo de emergência</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { alert('Token de consentimento'); closeKeyModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Token de consentimento</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { alert('Médicos associados'); closeKeyModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Médicos associados</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { alert('Minha família'); closeKeyModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Minha família</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeKeyModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={homeModalVisible}
        onRequestClose={closeHomeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => { navigation.navigate('Home'); closeHomeModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('AdicionarVacina'); closeHomeModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Adicionar vacina</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('AdicionarAlergia'); closeHomeModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Adicionar alergias</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('AdicionarMedicamento'); closeHomeModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Adicionar medicamentos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('AdicionarExame'); closeHomeModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Adicionar exame</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('AdicionarConsulta'); closeHomeModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Adicionar consulta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeHomeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={docModalVisible}
        onRequestClose={closeDocModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => { navigation.navigate('Exames'); closeDocModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Exames</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { alert('Documentos complementares'); closeDocModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Documentos complementares</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Consultas'); closeDocModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Consultas</Text>
            </TouchableOpacity>
          
            <TouchableOpacity onPress={closeDocModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={medicalOptionsModalVisible}
        onRequestClose={closeMedicalOptionsModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => { navigation.navigate('Vacinas'); closeMedicalOptionsModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Vacinas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Medicamentos'); closeMedicalOptionsModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Medicamentos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Alergias'); closeMedicalOptionsModal(); }} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Alergias</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeMedicalOptionsModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    width: '100%',
    // Remover position absolute
  },
  button: {
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: 'red',
  },
});

