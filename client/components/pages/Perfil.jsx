import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import ListCell from '../molecules/ListCell/ListCell';
import colors, { neutral, primary } from '../config/colors';
import TextPairing from '../atoms/TextPairing/TextPairing';
import { moderateScale } from '../config/utils';
import {useAuth0} from 'react-native-auth0';
import { useAuthRequest } from 'expo-auth-session';

export default function Perfil({style, navigation}) {
  const {authorize, clearSession, user} = useAuth0();
  const { request, response } = useAuthRequest({
    clientId: 'MyeGeaRTeWeBcqeMnzfiDz5jZJcGifRg',
    redirectUri: 'com.hamstec.hamstec://dev-2wwzzdwaumez74kc.us.auth0.com/ios/com.hamstec.hamstec/callback',
    issuer: 'https://dev-2wwzzdwaumez74kc.us.auth0.com/',
    scopes: ['openid', 'profile', 'email'],
  });

  React.useEffect(() => {
    if (response) {
      const { access_token } = response.params;
      console.log(`Access token: ${access_token}`);
    }
  }, [response]);

  const fetchToken = async () => {
    const response = await fetch('https://dev-2wwzzdwaumez74kc.us.auth0.com/oauth/token', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: 'MyeGeaRTeWeBcqeMnzfiDz5jZJcGifRg',
        client_secret: 'Q6qlyPklZ0VhP4Jmhj4nv6KTiPSwRaE0YfirTgclpBvvXLsoN9dcF9dLS-dANRKc',
        audience: 'https://hamstec-api-endpoint'
      })
    });
    const json = await response.json();
    console.log(json);
    // .then(json => console.log(json))
    // console.log("response", response);
  }

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  const loggedIn = user !== undefined && user !== null;

  return(
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.backgroundCover} />
        <View style={{backgroundColor: primary.s400}}>
          <View style={styles.profile}>
            <Image
              style={styles.image}
              source={{ uri: loggedIn? user.picture : null }} />
            <TextPairing text={loggedIn? user.name : 'Not logged in'} type='semibold' size={32} />
            <TextPairing text={loggedIn? user.email : 'Not logged in'} type='light' size={24} />
            <View style={styles.listCells}>
              <ListCell text='Clientes' iconName='people' style={styles.configItem} onPress={() => navigation.navigate('Clientes')} />
              <ListCell text='Secciones' iconName='folder-open' style={styles.configItem} onPress={() => navigation.navigate('Secciones')} />
              <ListCell text='Marcas' iconName='pricetag' style={styles.configItem} onPress={() => navigation.navigate('Marcas')} />
              <ListCell text='Log out' iconName='log-out' style={styles.configItem} onPress={() => onLogout()} />
              <ListCell text='Fetch' iconName='log-out' style={styles.configItem} onPress={() => fetchToken()} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.background
  },
  backgroundCover: {
    width: '100%',
    backgroundColor: primary.s400,
    padding: 12,
    height: 150,
  },
  profile: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  image: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: 400/2,
    marginBottom: 8,
    marginTop: -90,
    borderWidth: 6,
    borderColor: colors.background,
  },
  listCells: {
    width: '100%',
    marginTop: 16,
  },
  configItem: {
    marginBottom: 8,
  },
  discountBtn: {
    backgroundColor: neutral.white,
    width: '100%',
    paddingVertical: 8,
  },
});
