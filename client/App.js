// export { default } from './storybook/index';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import BottomNavigation from './components/molecules/BottomNavigation/BottomNavigation';
import Proyectos from './components/pages/Proyectos/Proyectos';
import AppLoading from "expo-app-loading";
import { Jost_300Light, Jost_400Regular, Jost_500Medium, Jost_600SemiBold, useFonts } from '@expo-google-fonts/jost';

const Tab = createBottomTabNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Jost_300Light,
    Jost_400Regular,
    Jost_500Medium,
    Jost_600SemiBold
  });

  if (!fontsLoaded) {
    return (
      <AppLoading />
    );
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          tabBar={props => <BottomNavigation {...props} />}
          screenOptions={{
            tabBarStyle: [styles.tabBarStyle],
            headerShown: false,
          }} >
          <Tab.Screen name="Proyectos" component={Proyectos} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
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
