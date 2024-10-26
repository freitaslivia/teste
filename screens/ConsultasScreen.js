import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

export default function ConsultasScreen({ navigation }) {
    const [consultas, setConsultas] = useState([]);
    const [expandedItem, setExpandedItem] = useState(null);

    useEffect(() => {
        const fetchConsultas = async () => {
            try {
                const userId = await AsyncStorage.getItem('id');
                const response = await fetch(`https://yaso.azurewebsites.net/consultas/${userId}`);
                const data = await response.json();
                setConsultas(data);
            } catch (error) {
                console.error('Erro ao buscar consultas:', error);
            }
        };

        fetchConsultas();

        const intervalId = setInterval(fetchConsultas, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const toggleItem = (itemId) => {
        setExpandedItem(expandedItem === itemId ? null : itemId);
    };

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
                <Text style={styles.sectionTitle}>Consultas</Text>
                <View style={styles.divider} />
                <Text style={styles.sectionTitleDown}>
                    Caso precise encontrar uma consulta antiga ou atual, use o campo de pesquisa ou de filtro.
                </Text>
                {consultas.map((consulta) => (
                    <View key={consulta.id} style={styles.itemContainer}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemTitle}>{consulta.medico}</Text>
                            <View style={styles.actions}>
                                <TouchableOpacity onPress={() => toggleItem(consulta.id)} style={styles.actionButton}>
                                    <Ionicons name={expandedItem === consulta.id ? "chevron-up" : "chevron-down"} size={20} color="gray" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {expandedItem === consulta.id && (
                            <View style={styles.itemContentContainer}>
                                <Text style={styles.itemContent}>
                                    {`Data: ${consulta.data}\nHora: ${consulta.hora}\nEspecialidade: ${consulta.especialidade}\nCRM: ${consulta.crm}\nTelefone: ${consulta.telefone}\nDescrição: ${consulta.descricao}`}
                                </Text>
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AdicionarConsulta')}>
                <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>

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
});
