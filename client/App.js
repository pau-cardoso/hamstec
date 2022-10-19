// export { default } from './storybook/index';

import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppLoading from "expo-app-loading";
import { Jost_300Light, Jost_400Regular, Jost_500Medium, Jost_600SemiBold, useFonts } from '@expo-google-fonts/jost';
import Navigation from './Navigation';

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
      <Navigation />
    );
  }
}
