import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import ListCell from '../molecules/ListCell/ListCell';
import colors, { primary } from '../config/colors';
import TextPairing from '../atoms/TextPairing/TextPairing';

export default function Perfil({style, navigation}) {
  return(
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.backgroundCover} />
        <View style={{backgroundColor: primary.s400}}>
          <View style={styles.profile}>
            <Image
              resizeMode='center'
              style={styles.image}
              source={{ uri: 'https://www.fakepersongenerator.com/Face/male/male20171086010783539.jpg' }} />
            <TextPairing text='Paulina' type='semibold' size={32} />
            <View style={styles.listCells}>
              <ListCell text='Clientes' iconName='people' style={styles.configItem} onPress={() => navigation.navigate('Clientes')} />
              <ListCell text='Secciones' iconName='folder-open' style={styles.configItem} onPress={() => navigation.navigate('Secciones')} />
              <ListCell text='Marcas' iconName='pricetag' style={styles.configItem} />
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
    width: 150,
    height: 150,
    alignSelf: 'grow',
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
});
