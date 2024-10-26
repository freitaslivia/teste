import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import TermsScreen from './screens/TermsScreen';
import HomeScreen from './screens/HomeScreen';
import EmergencyScreen from './screens/EmergencyScreen'; 
import AdicionarVacinaScreen from './screens/AdicionarVacinaScreen';
import AdicionarAlergiaScreen from './screens/AdicionarAlergiaScreen';
import AdicionarConsultaScreen from './screens/AdicionarConsultaScreen';
import AdicionarExameScreen from './screens/AdicionarExameScreen';
import AdicionarMedicamentoScreen from './screens/AdicionarMedicamentoScreen';
import ExamesScreen from './screens/ExamesScreen';
import ConsultasScreen from './screens/ConsultasScreen';
import AlergiasScreen from './screens/AlergiasScreen';
import VaccinesScreen from './screens/VaccinesScreen';
import MedicamentosScreen from './screens/MedicamentosScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="Terms" 
          component={TermsScreen} 
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="Emergency" 
          component={EmergencyScreen} 
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="AdicionarVacina" 
          component={AdicionarVacinaScreen} 
          options={{ headerShown: false }}
        />
        
        <Stack.Screen 
          name="AdicionarAlergia" 
          component={AdicionarAlergiaScreen} 
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="AdicionarConsulta" 
          component={AdicionarConsultaScreen} 
          options={{ headerShown: false }}
        />

       <Stack.Screen 
          name="AdicionarExame" 
          component={AdicionarExameScreen} 
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="AdicionarMedicamento" 
          component={AdicionarMedicamentoScreen} 
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="Exames" 
          component={ExamesScreen} 
          options={{ headerShown: false }}
        />

      <Stack.Screen 
          name="Consultas" 
          component={ConsultasScreen} 
          options={{ headerShown: false }}
        />

      <Stack.Screen 
          name="Alergias" 
          component={AlergiasScreen} 
          options={{ headerShown: false }}
      />

      <Stack.Screen 
          name="Vacinas" 
          component={VaccinesScreen} 
          options={{ headerShown: false }}
      />

      <Stack.Screen 
          name="Medicamentos" 
          component={MedicamentosScreen} 
          options={{ headerShown: false }}
      />



      </Stack.Navigator>
    </NavigationContainer>
  );
}
