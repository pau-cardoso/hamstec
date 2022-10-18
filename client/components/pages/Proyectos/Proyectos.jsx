import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import PageTemplate from '../../templates/PageTemplate';
import ListItem from '../../molecules/ListItem/ListItem';
import HeaderSearch from '../../organisms/HeaderSearch/HeaderSearch';

const DATA = [
  {
    id: 1,
    name: 'Laja 52',
    client: 'Jose Luis Alvarado'
  },
  {
    id: 2,
    name: 'Laja 53',
    client: 'Jose Luis Alvarado'
  },
  {
    id: 3,
    name: 'Laja 54',
    client: 'Jose Luis Alvarado'
  },
];


export default function Proyectos({style}) {
  const [searchPhrase, setSearchPhrase] = React.useState("");

  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return(
        <View style={styles.item}>
          <ListItem text={item.name} secondaryText={item.client} />
        </View>
      );
    }
    // filter of the name
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
      return(
        <View style={styles.item}>
          <ListItem text={item.name} secondaryText={item.client} />
        </View>
      );
    }

    // filter of client
    if (item.client.toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
      return(
        <View style={styles.item}>
          <ListItem text={item.name} secondaryText={item.client} />
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
            setSearchPhrase={setSearchPhrase} />
        }
        body={
          <FlatList
            data={DATA}
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

Proyectos.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
  bottomNavigation: PropTypes.element,
};
