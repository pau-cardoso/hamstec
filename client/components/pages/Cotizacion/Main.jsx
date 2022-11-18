import React from 'react';
import { StyleSheet, View } from 'react-native';
import PageHeader from '../../molecules/PageHeader/PageHeader';
import { TopTabNavigation } from '../../../Navigation';
import { neutral } from '../../config/colors';

export default function Main({style, navigation, route}) {

  return(
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <PageHeader
          style={styles.gap}
          title='Proyecto'
          onPressBackButton={() => navigation.goBack()} />
      </View>
      <TopTabNavigation route={route} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flex: 1,
  },
  header: {
    backgroundColor: neutral.white,
    paddingHorizontal: 32,
    paddingTop: 20,
  },
  gap: {
    marginBottom: 12,
  },
});
