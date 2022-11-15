import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import PageHeader from '../../molecules/PageHeader/PageHeader';
import { TopTabNavigation } from '../../../Navigation';
import { neutral } from '../../config/colors';

export default function Main({style, navigation, route}) {
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const {quoteId, projectId} = route.params;
  const url = "http://localhost:3000/quote-product/quote/" + quoteId;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(Object.values(json[0]));
      })
      .catch((error) => console.error(error))
    }, []);

  return(
    <View style={[styles.container]}>
      <View style={styles.header}>
        <PageHeader
          style={styles.gap}
          title='Proyecto'
          rightButtonIcon='add-circle'
          onPressBackButton={() => navigation.goBack()}
          onRightButtonClick={() => navigation.navigate('AgregarSeccion', { idQuote: quoteId, setRefreshing: setRefreshing })} />
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
