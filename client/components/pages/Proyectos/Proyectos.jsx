import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import PageTemplate from '../../templates/PageTemplate';
import ListItem from '../../molecules/ListItem/ListItem';
import HeaderSearch from '../../organisms/HeaderSearch/HeaderSearch';

export default function Proyectos({style, navigation}) {
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [data, setData] = React.useState([]);

  const url = "http://localhost:3000/project";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
  }, []);

  const renderItem = ({ item }) => {
    // when no input, show all
    if ( searchPhrase === "" ||
        item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim())
        || item.client.name.toUpperCase().includes(searchPhrase.toUpperCase().trim())
        ) {
      return(
        <View style={styles.item}>
          <ListItem
            text={item.name}
            secondaryText={item.client.name}
            onPress={() => navigation.navigate('Versiones', {id_project: item.id})} />
        </View>
      );
    }
  };

  return(
    <View style={[styles.container, style]}>
      <PageTemplate
        header={
          <HeaderSearch
            title='Proyectos'
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            rightButtonIcon='add-circle'
            onRightButtonClick={() => navigation.navigate('AgregarProyecto')} />
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
    height: '100%',
  },
  item: {
    marginBottom: 12,
  }
});

Proyectos.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
  bottomNavigation: PropTypes.element,
};
