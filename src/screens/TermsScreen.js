import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const TermsScreen = ({ navigation }) => {

  const handleDecline = () => {
    navigation.navigate('Login');
  };

  const handleAccept = () => {
    navigation.navigate('Home'); 
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
        <Text style={styles.heading}>Termos e Condições</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>


          <Text style={styles.sectionTitle}>1. Introdução</Text>
          <Text style={styles.text}>
              Bem-vindo ao Yaso! Estes Termos e Condições ("Termos") regem o uso do aplicativo Yaso ("Aplicativo"), a plataforma que centraliza e gerencia seus dados médicos pessoais. Ao utilizar o Yaso, você concorda com estes Termos, nossa Política de Privacidade e quaisquer outras diretrizes adicionais fornecidas. Por favor, leia atentamente antes de utilizar nossos serviços.
          </Text>

          <Text style={styles.sectionTitle}>2. Aceitação dos Termos</Text>
          <Text style={styles.text}>
Ao acessar ou utilizar o aplicativo Yaso, você concorda em estar vinculado a estes Termos. Se você não concorda com algum desses Termos, não use o aplicativo. O uso contínuo do Yaso significa que você aceita estes Termos e as atualizações que poderão ser feitas de tempos em tempos.
 
          </Text>

          <Text style={styles.sectionTitle}>3. Descrição do Serviço</Text>
          <Text style={styles.text}>
O Yaso é uma plataforma digital de gestão de dados médicos pessoais e familiares que permite aos usuários armazenar, acessar e compartilhar seus dados médicos de forma segura e controlada. Nossas funcionalidades incluem:
 
1. Centralização de dados médicos,
2. Modo Emergência,
3. Controle de acesso via Token de Consentimento,
4. Integração com APIs de saúde públicas e privadas,
5. Utilização de inteligência artificial para gerar resumos automáticos de saúde.
          </Text>

          <Text style={styles.sectionTitle}>4. Elegibilidade</Text>
          <Text style={styles.text}>
Você deve te’r pelo menos 18 anos de idade ou ser maior de idade conforme as leis aplicáveis em sua jurisdição para utilizar o Yaso. Se você for menor de idade, deve obter o consentimento dos seus pais ou responsáveis legais antes de usar o aplicativo.
          </Text>

          <Text style={styles.sectionTitle}>5. Registro e Segurança da Conta</Text>
          <Text style={styles.text}>
Para acessar algumas funcionalidades do Yaso, é necessário criar uma conta. Ao se registrar, você concorda em fornecer informações precisas, atuais e completas. É sua responsabilidade manter a confidencialidade de sua senha e de qualquer atividade sob sua conta. Você concorda em notificar imediatamente o Yaso sobre qualquer uso não autorizado de sua conta ou qualquer violação de segurança.
          </Text>

          <Text style={styles.sectionTitle}>6. Coleta e Uso de Dados</Text>
          <Text style={styles.text}>
O Yaso coleta dados pessoais e médicos fornecidos pelos usuários, bem como informações inseridas por APIs conectadas. Esses dados incluem:
 
1. Exames médicos, laudos e receitas,
2. Histórico de consultas e vacinas,
3. Informações de contato e dados familiares, se autorizado pelo usuário.
4. Essas informações são utilizadas para:
 
5. Centralizar os dados médicos e facilitar o acesso do usuário,
6. Gerar insights personalizados por meio de IA,
7. Compartilhar dados médicos com profissionais de saúde mediante consentimento.
          </Text>

          <Text style={styles.sectionTitle}>7. Token de Consentimento</Text>
          <Text style={styles.text}>
O Yaso oferece ao usuário o controle sobre quem pode acessar seus dados médicos. Através do Token de Consentimento, você pode definir o nível de acesso (visualização, download, etc.) e o período de tempo pelo qual terceiros (como médicos ou familiares) podem acessar suas informações. A responsabilidade pelo uso do Token é totalmente do usuário.
          </Text>

          <Text style={styles.sectionTitle}>8. Segurança dos Dados</Text>
          <Text style={styles.text}>

Levamos a segurança dos seus dados muito a sério. Todas as informações são protegidas com criptografia AES-256 e autenticação em dois fatores (2FA) para garantir que somente você e as partes autorizadas possam acessar seus dados. No entanto, o Yaso não pode garantir a completa segurança contra ataques cibernéticos, e o usuário deve tomar medidas adicionais para proteger suas informações.
          </Text>

          <Text style={styles.sectionTitle}>9. Modo Emergência</Text>
          <Text style={styles.text}>

Ao ativar o Modo Emergência, você permite que determinadas informações médicas vitais sejam acessadas na tela bloqueada do dispositivo, como:
 
1. Tipo sanguíneo,
2. Alergias,
3. Condições crônicas e medicamentos de uso contínuo.
4. Você pode ativar ou desativar o Modo Emergência a qualquer momento através das configurações do aplicativo.
          </Text>

          <Text style={styles.sectionTitle}>10. Compartilhamento de Dados</Text>
          <Text style={styles.text}>
O Yaso permite que você compartilhe seus dados médicos com terceiros, como médicos e instituições de saúde, de forma controlada. Você decide quais informações serão compartilhadas e por quanto tempo. Nós não compartilhamos seus dados com terceiros sem o seu consentimento, exceto conforme exigido por lei ou para fins de segurança.
          </Text>

          <Text style={styles.sectionTitle}>11. Limitação de Responsabilidade</Text>
          <Text style={styles.text}>
O Yaso oferece um serviço de gestão de dados médicos, mas não presta serviços médicos, diagnósticos ou consultas. Qualquer uso das informações fornecidas no aplicativo é de responsabilidade do usuário e dos profissionais de saúde envolvidos. O Yaso não se responsabiliza por quaisquer decisões médicas tomadas com base nas informações disponibilizadas no aplicativo
          </Text>

          <Text style={styles.sectionTitle}>12. Modificações nos Termos</Text>
          <Text style={styles.text}>
O Yaso reserva-se o direito de modificar estes Termos a qualquer momento. As alterações entrarão em vigor assim que publicadas no aplicativo. O uso contínuo do Yaso após qualquer modificação nos Termos constitui a aceitação das alterações.
          </Text>

          <Text style={styles.sectionTitle}>13. Cancelamento e Encerramento da Conta</Text>
          <Text style={styles.text}>
Você pode encerrar sua conta Yaso a qualquer momento. Se optar por encerrar sua conta, todos os seus dados pessoais e médicos serão excluídos de nossos sistemas de forma irreversível. O Yaso se reserva o direito de encerrar ou suspender sua conta em caso de violação destes Termos.
          </Text>

          <Text style={styles.sectionTitle}>14. Política de Privacidade</Text>
          <Text style={styles.text}>
A Política de Privacidade do Yaso descreve como coletamos, usamos e protegemos suas informações pessoais. Você pode acessá-la [aqui] (link para a política de privacidade).
          </Text>

          <Text style={styles.sectionTitle}>15. Direitos de Propriedade Intelectual</Text>
          <Text style={styles.text}>
Todo o conteúdo, funcionalidades e design do aplicativo Yaso são protegidos por direitos de propriedade intelectual. Nenhuma parte do aplicativo pode ser reproduzida, distribuída, modificada ou utilizada sem autorização prévia.
          </Text>

          <Text style={styles.sectionTitle}>16. Legislação Aplicável</Text>
          <Text style={styles.text}>

Estes Termos são regidos pelas leis da jurisdição aplicável no Brasil, e qualquer disputa deverá ser resolvida nos tribunais competentes.
          </Text>

          <Text style={styles.sectionTitle}>17. Contato</Text>
          <Text style={styles.text}>
Se você tiver dúvidas sobre estes Termos e Condições, entre em contato conosco pelo e-mail: suporte@yasoapp.com.
          </Text>

          <Text style={styles.sectionTitle}>18. Sensor de Proximidade NFC</Text>
          <Text style={styles.text}>
O Yaso possui em uma de suas funções o uso do NFC, sensor de proximidade do telefone. Este sensor é utilizado para coletar os dados do modo de emergência para atendimento dos primeiros socorros. Um dispositivo que possua uma conta médica poderá acessar os dados previamente autorizados por você.
          </Text>

          <Text style={styles.sectionTitle}>Conclusão</Text>
          <Text style={styles.text}>
Este é um modelo completo e detalhado de Termos e Condições para o aplicativo Yaso, adaptado à complexidade e especificidade do projeto. Ele cobre as principais áreas de governança, uso de dados e funcionalidades críticas, como controle de acesso, segurança e o uso do Modo Emergência. Esse documento serve tanto para proteção legal quanto para assegurar a transparência com os usuários, garantindo que eles entendam seus direitos e responsabilidades ao utilizar o Yaso.
          </Text>
        </ScrollView>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.declineButton} onPress={handleDecline}>
            <Text style={styles.declineText}>não aceito</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <Text style={styles.acceptText}>aceito</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 40,
  },
  whiteBox: {
    flex: 1,
    width: '100%', 
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    top: 150, 
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20, 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#6433A2',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#6433A2',
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  buttonsContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center', 
  },
  declineButton: {
    width: '50%', 
    backgroundColor: '#ddd',
    paddingVertical: 15,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 25,
  },
  acceptButton: {
    width: '90%', 
    backgroundColor: '#6030A0',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 25,
  },
  declineText: {
    color: '#555',
    fontSize: 16,
  },
  acceptText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TermsScreen;
