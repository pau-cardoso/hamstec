import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import BottomNavigation from './components/molecules/BottomNavigation/BottomNavigation';
import AgregarProducto from './components/pages/AgregarProducto/AgregarProducto';
import Proyectos from './components/pages/Proyectos/Proyectos';
import AgregarDetallesProducto from './components/pages/AgregarDetallesProducto/AgregarDetallesProducto'


const ProjectStackNavigator = createNativeStackNavigator();

function ProjectStack() {
  return (
    <ProjectStackNavigator.Navigator initialRouteName='Proyectos'>
      <ProjectStackNavigator.Screen name="Proyectos" component={Proyectos} />
      <ProjectStackNavigator.Screen name="AgregarProyecto" component={Proyectos} options={{presentation: 'modal'}} />
      <ProjectStackNavigator.Screen name="Versiones" component={AgregarProducto} />
      <ProjectStackNavigator.Screen name="Presupuesto" component={AgregarProducto} />
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
      <Tab.Screen name="Home" component={AgregarProducto} />
      <Tab.Screen name="Proyectos" component={ProjectStack} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
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