// export { default } from './storybook/index';

import 'react-native-gesture-handler';
import AppLoading from "expo-app-loading";
import { Jost_300Light, Jost_400Regular, Jost_500Medium, Jost_600SemiBold, useFonts } from '@expo-google-fonts/jost';
import Navigation from './Navigation';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { store, persistor } from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { fetchProjects } from './store/actions/ProjectActions';
import { useEffect } from 'react';
import { fetchQuotes } from './store/actions/QuoteActions';
import {useAuth0, Auth0Provider} from 'react-native-auth0';

// Ignore all log notifications:
LogBox.ignoreAllLogs();

const fetchData = () => {
  fetchProjects();
  fetchQuotes();
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Jost_300Light,
    Jost_400Regular,
    Jost_500Medium,
    Jost_600SemiBold
  });

  useEffect(() => {
    fetchData();
  }, []);

  if (!fontsLoaded) {
    return (
      <AppLoading />
    );
  } else {
    return (
      <Auth0Provider domain={"dev-2wwzzdwaumez74kc.us.auth0.com"} clientId={"MyeGeaRTeWeBcqeMnzfiDz5jZJcGifRg"}>
        <Provider store={store} persistor={persistor}>
          <PersistGate persistor={persistor}>
            <Navigation />
          </PersistGate>
        </Provider>
      </Auth0Provider>
    );
  }
}
