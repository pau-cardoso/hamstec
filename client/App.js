// export { default } from './storybook/index';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import BottomNavigation from './components/molecules/BottomNavigation/BottomNavigation';
import AgregarProducto from './components/pages/AgregarProducto/AgregarProducto'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <BottomNavigation {...props} />}
        screenOptions={{
          tabBarStyle: [styles.tabBarStyle],
          headerShown: false,
        }} >
        <Tab.Screen name="Proyectos" component={AgregarProducto} />
      </Tab.Navigator>
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
