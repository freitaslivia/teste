import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meu Yaso</Text>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Emergencia')}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Isadora Martins</Text>
              <Text style={styles.cardDate}>01 / 01 / 2000</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardArrow}>▼</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Médicos responsáveis</Text>
          <View style={styles.separator} />
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Pediatra</Text>
            </View>
            <View style={styles.cardContent}>
              <Image
                source={{ uri: 'https://clinicammdc.com/images/pediatra.jpg' }}
                style={styles.cardImage}
              />
              <View style={styles.cardDetails}>
                <Text style={styles.cardSubtitle}>Antonieta Sanches</Text>
                <Text style={styles.cardSmallText}>CRM 123456</Text>
              </View>
              <Image
                source={{ uri: 'https://i.ibb.co/c362TY6/entalhe-movel.png' }}
                style={styles.cardIcon}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximas consultas</Text>
          <View style={styles.separator} />
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Ortopedista</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardDetails}>
                <View style={styles.inlineTextIcon}>
                  <Image
                    source={{ uri: 'https://i.ibb.co/z687T6N/pin-1.png' }}
                    style={styles.smallIcon}
                  />
                  <Text style={styles.cardSubtitleUnderline}>
                    Delboni Aureliano Itaim
                  </Text>
                </View>
                <View style={styles.inlineTextIcon}>
                  <Image
                    source={{ uri: 'https://i.ibb.co/GQq4BW2/clock.png' }}
                    style={styles.smallIcon}
                  />
                  <Text style={styles.cardSmallText}>
                    26 / 10 / 2024 - 08:30
                  </Text>
                </View>
              </View>
              <View style={styles.cardIcons}>
                <Image
                  source={{ uri: 'https://i.ibb.co/mcpGQ85/copiar-imagem.png' }}
                  style={styles.cardIcon}
                />
                <Image
                  source={{ uri: 'https://i.ibb.co/c362TY6/entalhe-movel.png' }}
                  style={styles.cardIcon}
                />
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Minha família</Text>
        <View style={styles.separator} />
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Lilian Martins Oliveira</Text>
          </View>
          <View style={styles.cardContent}>
            <Image
              source={{ uri: 'https://clinicammdc.com/images/pediatra.jpg' }}
              style={styles.cardImage}
            />
            <View style={styles.cardDetails}>
              <Text style={styles.cardSubtitle}>Y24.36.25.83151</Text>
            </View>
            <Image
              source={{ uri: 'https://i.ibb.co/c362TY6/entalhe-movel.png' }}
              style={styles.cardIcon}
            />
          </View>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#D3D3D3',
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 1,
    fontWeight: '300',
  },
  card: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#8864b8',
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#6433A2',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cardDate: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  cardContent: {
    backgroundColor: '#AF97CF',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cardSubtitleUnderline: {
    fontSize: 12,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  cardSmallText: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  cardImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  cardIcons: {
    flexDirection: 'row',
  },
  cardIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  cardArrow: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
  },

  inlineTextIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  smallIcon: {
    width: 8,
    height: 8,
    marginRight: 5,
  },
});
