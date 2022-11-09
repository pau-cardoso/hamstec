import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import PageTemplate from '../../templates/PageTemplate';
import ListItem from '../../molecules/ListItem/ListItem';
import HeaderSearch from '../../organisms/HeaderSearch/HeaderSearch';


export default function Versiones({style, navigation, route}) {
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [data, setData] = React.useState([]);

  const url = "http://localhost:3000/quote/project/" + route.params.id_project;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
  }, []);

  const renderItem = ({ item }) => {
    // when no input, show all
    if ( searchPhrase === "" ||
        item.version.toUpperCase().includes(searchPhrase.toUpperCase().trim()) ) {
      return(
        <View style={styles.item}>
          <ListItem
            text={item.version}
            onPress={() => navigation.navigate('Cotizacion', {quoteId: item.id, projectId: route.params.id_project})}
          />
        </View>
      );
    }
  };

  return(
    <View style={[styles.container, style]}>
      <PageTemplate
        header={
          <HeaderSearch
            title='Versiones'
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            onPressBackButton={() => navigation.goBack()} />
        }
        body={
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
  },
  item: {
    marginBottom: 12,
  }
});

Versiones.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
  bottomNavigation: PropTypes.element,
};
