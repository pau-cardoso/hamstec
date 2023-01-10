import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import PageHeader from '../../molecules/PageHeader/PageHeader';
import { TopTabNavigation } from '../../../Navigation';
import { neutral } from '../../config/colors';
import { useState } from 'react';
import { moderateScale } from '../../config/utils';

export default function Main({style, navigation, route}) {
  const [title, setTitle] = useState("");
  const [clientVersion, setClientVersion] = useState("");
  const { projectId } = route.params;

  useEffect(() => {
    fetch("http://localhost:3000/project/" + projectId)
      .then((response) => response.json())
      .then((json) => {
        setTitle(json.name)
        setClientVersion(json.client.name)
      })
      .catch((error) => console.error(error))
    }, []);

  return(
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <PageHeader
          style={styles.gap}
          title={title}
          secondaryTitle={clientVersion}
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
    paddingHorizontal: moderateScale(32),
    paddingTop: moderateScale(20),
  },
  gap: {
    marginBottom: moderateScale(12),
  },
});
