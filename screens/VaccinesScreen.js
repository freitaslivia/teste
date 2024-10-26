import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

export default function VaccinesScreen({ navigation }) {
    const [vacinas, setVacinas] = useState([]);
    const [expandedItem, setExpandedItem] = useState(null);
    const [comprovantes, setComprovantes] = useState({});

    useEffect(() => {
        const fetchVacinas = async () => {
            try {
                const userId = await AsyncStorage.getItem('id');
                const response = await fetch(`https://yaso.azurewebsites.net/vacinas/${userId}`);
                const data = await response.json();
                setVacinas(data);
            } catch (error) {
                console.error('Erro ao buscar vacinas:', error);
            }
        };

        fetchVacinas();
    }, []);

    const toggleItem = async (itemId) => {
        if (expandedItem === itemId) {
            setExpandedItem(null);
        } else {
            setExpandedItem(itemId);
            if (!comprovantes[itemId]) {
                try {
                    const response = await fetch(`https://yaso.azurewebsites.net/vacinas/comprovante/${itemId}`);
                    const comprovanteUri = await response.json();
                    setComprovantes((prev) => ({ ...prev, [itemId]: comprovanteUri }));
                } catch (error) {
                    console.error(`Erro ao buscar comprovante para vacina ${itemId}:`, error);
                }
            }
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.iconRow}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <Ionicons name="arrow-back" size={20} color="purple" />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Vacinas</Text>
                <View style={styles.divider} />
                {vacinas.map((item) => (
                    <View key={item.id} style={styles.itemContainer}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemTitle}>{item.titulo}</Text>
                            <TouchableOpacity onPress={() => toggleItem(item.id)} style={styles.actionButton}>
                                <Ionicons name={expandedItem === item.id ? "chevron-up" : "chevron-down"} size={20} color="gray" />
                            </TouchableOpacity>
                        </View>
                        {expandedItem === item.id && (
                            <View style={styles.itemContentContainer}>
                                <Text style={styles.itemContent}>Data de Aplicação: {item.dataAplicacao}</Text>
                                <Text style={styles.itemContent}>Responsável: {item.responsavel}</Text>
                                <Text style={styles.itemContent}>Nome: {item.nome}</Text>
                                {comprovantes[item.id] ? (
                                    <Image 
                                        source={{ uri: comprovantes[item.id] }} 
                                        style={styles.comprovanteImage} 
                                        resizeMode="contain" 
                                    />
                                ) : (
                                    <Text style={styles.itemContent}>Comprovante: Não disponível</Text>
                                )}
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
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
    },
    itemContentContainer: {
        marginTop: 10,
    },
    itemContent: {
        color: '#555555',
        fontSize: 12,
    },
    actionButton: {
        marginLeft: 10,
    },
    comprovanteImage: {
        width: '100%',
        height: 200,
        marginTop: 10,
    },
});
