import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { neutral, primary } from '../config/colors';
import { moderateScale } from '../config/utils';
import Auth0, {useAuth0} from 'react-native-auth0';
import Button from '../atoms/Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn({style, navigation}) {
  const {authorize, user} = useAuth0();

  const fetchToken = async () => {
    // const response = await
    fetch('https://dev-2wwzzdwaumez74kc.us.auth0.com/oauth/token', {
      method: 'POST',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      body: {
        grant_type: 'client_credentials',
        client_id: 'MyeGeaRTeWeBcqeMnzfiDz5jZJcGifRg',
        client_secret: 'Q6qlyPklZ0VhP4Jmhj4nv6KTiPSwRaE0YfirTgclpBvvXLsoN9dcF9dLS-dANRKc',
        audience: 'https://hamstec-api-endpoint'
      }
    }).then(response => {
      console.log("acces_token", response.access_token);
      console.log("response data", response.data);
    })
    // .then(json => console.log(json))
    // console.log("response", response);
  }

  const onLogin = async () => {
    try {
      const authResult = await authorize({
        scope: 'openid profile email',
        audience: 'https://hamstec-api-endpoint'
      });
      await fetchToken();
      // await AsyncStorage.setItem('token', authResult.accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  const loggedIn = user !== undefined && user !== null;

  return(
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/logo_name.png')} />
      <Button
        title='Iniciar sesión'
        textColor='brand'
        textSize={24}
        onPress={() => onLogin()}
        style= {styles.signInBtn}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: primary.brand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: moderateScale(150),
    height: moderateScale(150),
    marginBottom: 36,
  },
  signInBtn: {
    backgroundColor: neutral.white,
  },
});
