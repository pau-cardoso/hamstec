import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { neutral, primary } from '../config/colors';
import { moderateScale } from '../config/utils';
import {useAuth0} from 'react-native-auth0';
import Button from '../atoms/Button/Button';

export default function SignIn({style, navigation}) {
  const {authorize, user} = useAuth0();

  const onLogin = async () => {
    try {
      await authorize({scope: 'openid profile email'});
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
