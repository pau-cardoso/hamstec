import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import ListCell from '../molecules/ListCell/ListCell';
import colors, { neutral, primary } from '../config/colors';
import TextPairing from '../atoms/TextPairing/TextPairing';
import { moderateScale } from '../config/utils';
import {useAuth0} from 'react-native-auth0';

export default function Perfil({style, navigation}) {
  const {authorize, clearSession, user} = useAuth0();

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  return(
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.backgroundCover} />
        <View style={{backgroundColor: primary.s400}}>
          <View style={styles.profile}>
            <Image
              style={styles.image}
              source={{ uri: user.picture }} />
            <TextPairing text={user.name} type='semibold' size={32} />
            <TextPairing text={user.email} type='light' size={24} />
            <View style={styles.listCells}>
              <ListCell text='Clientes' iconName='people' style={styles.configItem} onPress={() => navigation.navigate('Clientes')} />
              <ListCell text='Secciones' iconName='folder-open' style={styles.configItem} onPress={() => navigation.navigate('Secciones')} />
              <ListCell text='Marcas' iconName='pricetag' style={styles.configItem} onPress={() => navigation.navigate('Marcas')} />
              <ListCell text='Log out' iconName='log-out' style={styles.configItem} onPress={() => onLogout()} />
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
