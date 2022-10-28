import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import BottomNavigation from './components/molecules/BottomNavigation/BottomNavigation';
import AgregarProducto from './components/pages/AgregarProducto/AgregarProducto';
import Proyectos from './components/pages/Proyectos/Proyectos';
import AgregarDetallesProducto from './components/pages/AgregarDetallesProducto/AgregarDetallesProducto'
import AgregarProyecto from './components/pages/AgregarProyecto/AgregarProyecto';
import Versiones from './components/pages/Versiones/Versiones';
import Cotizacion from './components/pages/Cotizacion/Cotizacion';
import {HamstecTheme} from './Theme'


const ProjectStackNavigator = createNativeStackNavigator();

function ProjectStack() {
  return (
    <ProjectStackNavigator.Navigator
      initialRouteName='Proyectos'
      screenOptions={{
        headerShown: false,
      }} >
      <ProjectStackNavigator.Screen name="Proyectos" component={Proyectos} />
      <ProjectStackNavigator.Screen name="AgregarProyecto" component={AgregarProyecto} options={{presentation: 'modal'}} />
      <ProjectStackNavigator.Screen name="Versiones" component={Versiones} />
      <ProjectStackNavigator.Screen name="Cotizacion" component={Cotizacion} />
      <ProjectStackNavigator.Screen name="AgregarProducto" component={AgregarProducto} />
      <ProjectStackNavigator.Screen name="AgregarDetalles" component={AgregarDetallesProducto} />
    </ProjectStackNavigator.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export function TabNavigation() {
  return (
    <Tab.Navigator
      tabBar={props => <BottomNavigation {...props} />}
      screenOptions={{
        tabBarStyle: [styles.tabBarStyle],
        headerShown: false,
      }} >
      <Tab.Screen name="Proyectos" component={ProjectStack} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer theme={HamstecTheme}>
      <TabNavigation />
    </NavigationContainer>
  );
}

// TODO: Fix styling not working
const styles = StyleSheet.create({
  tabBarStyle: {
    margin: 10,
    left: 50,
    position: 'absolute',
    borderRadius: 10,
  },
});