import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import BottomNavigation from './components/molecules/Navigation/BottomNav';
import TopTabNav from './components/molecules/Navigation/TopTabNav';
import AgregarProducto from './components/pages/AgregarProducto/AgregarProducto';
import Proyectos from './components/pages/Proyectos/Proyectos';
import AgregarDetallesProducto from './components/pages/AgregarDetallesProducto/AgregarDetallesProducto'
import AgregarProyecto from './components/pages/AgregarProyecto/AgregarProyecto';
import AgregarSeccion from './components/pages/AgregarSeccion';
import Versiones from './components/pages/Versiones/Versiones';
import Cotizacion from './components/pages/Cotizacion/Cotizacion';
import Main from './components/pages/Cotizacion/Main';
import {HamstecTheme} from './Theme'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

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
      <ProjectStackNavigator.Screen name="Cotizacion" component={Main} />
      <ProjectStackNavigator.Screen name="AgregarSeccion" component={AgregarSeccion} options={{presentation: 'modal'}} />
      <ProjectStackNavigator.Screen name="AgregarProducto" component={AgregarProducto} />
      <ProjectStackNavigator.Screen name="AgregarDetalles" component={AgregarDetallesProducto} />
    </ProjectStackNavigator.Navigator>
  );
}

const TopTabs = createMaterialTopTabNavigator();

export function TopTabNavigation({route}) {
  return (
    <TopTabs.Navigator
      tabBarPosition='top'
      tabBar={props => <TopTabNav {...props} />} >
      <TopTabs.Screen name="Cotizacion" component={Cotizacion} initialParams={route.params} options={{tabBarLabel: 'Cotización'}} />
      <TopTabs.Screen name="Instalacion" component={Cotizacion} initialParams={route.params} options={{tabBarLabel: 'Instalación'}} />
      { /* TODO: Agregar componente de instalacion */}
    </TopTabs.Navigator>
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