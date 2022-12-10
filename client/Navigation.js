import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import BottomNavigation from './components/molecules/Navigation/BottomNav';
import TopTabNav from './components/molecules/Navigation/TopTabNav';
import AgregarProductoCotizacion from './components/pages/AgregarProductoCotizacion/AgregarProductoCotizacion';
import Proyectos from './components/pages/Proyectos/Proyectos';
import AgregarDetallesProducto from './components/pages/AgregarDetallesProducto/AgregarDetallesProducto'
import AgregarProyecto from './components/pages/AgregarProyecto/AgregarProyecto';
import AgregarSeccion from './components/pages/AgregarSeccion';
import Versiones from './components/pages/Versiones/Versiones';
import Cotizacion from './components/pages/Cotizacion/Cotizacion';
import Main from './components/pages/Cotizacion/Main';
import {HamstecTheme} from './Theme'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Instalacion from './components/pages/Cotizacion/Instalacion';
import ListaProductos from './components/pages/ListaProductos';
import DetalleProducto from './components/pages/DetalleProducto';
import AgregarProducto from './components/pages/AgregarProducto';
import AgregarProductoInstalacion from './components/pages/AgregarProductoInstalación';
import ResumenDispositivos from './components/pages/Cotizacion/ResumenDispositivos';
import ModificarViaticos from './components/pages/ModificarViaticos';

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
      <ProjectStackNavigator.Screen name="ModificarViaticos" component={ModificarViaticos} options={{presentation: 'modal'}} />
      <ProjectStackNavigator.Screen name="AgregarProductoCotizacion" component={AgregarProductoCotizacion} />
      <ProjectStackNavigator.Screen name="AgregarDetalles" component={AgregarDetallesProducto} />
      <ProjectStackNavigator.Screen name="AgregarProductoInstalacion" component={AgregarProductoInstalacion} />
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
      <TopTabs.Screen name="Instalacion" component={Instalacion} initialParams={route.params} options={{tabBarLabel: 'Instalación'}} />
      <TopTabs.Screen name="ResumenDispositivos" component={ResumenDispositivos} initialParams={route.params} options={{tabBarLabel: 'Resumen de dispositivos'}} />
    </TopTabs.Navigator>
  );
};

const ListProductsStack = createNativeStackNavigator();

function ListProductsStackNav() {
  return (
    <ListProductsStack.Navigator
      initialRouteName='Proyectos'
      screenOptions={{
        headerShown: false,
      }} >
      <ListProductsStack.Screen name="ListaProductos" component={ListaProductos} />
      <ListProductsStack.Screen name="DetalleProducto" component={DetalleProducto} />
      <ListProductsStack.Screen name="AgregarProducto" component={AgregarProducto} options={{presentation: 'modal'}} />
    </ListProductsStack.Navigator>
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
      <Tab.Screen name="ListaProductos" component={ListProductsStackNav} />
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