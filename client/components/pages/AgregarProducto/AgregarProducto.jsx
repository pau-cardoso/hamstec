import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import PageTemplate from '../../templates/PageTemplate';
import ProductSearch from '../../organisms/ProductSearch/ProductSearch';
import ListItem from '../../molecules/ListItem/ListItem';

const DATA = [
  {
    id: 1,
    name: 'Switch On/Off 1 R Serie Classic Glass',
    code: 'T30W1Z',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    brand: 'ORVIBO'
  },
  {
    id: 2,
    name: 'Controlador Multifunción',
    code: 'CM10ZW',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    brand: 'ORVIBO'
  },
  {
    id: 3,
    name: 'Controlador 2 regresos hasta 100 equipos',
    code: 'V30X',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    brand: 'Amazon'
  },
];


export default function AgregarProducto({navigation, style}) {
  const TABS = ['Todos', 'Broadlink', 'ORVIBO', 'Amazon']
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("Todos");

  const renderItem = ({ item }) => {
    const isBrandActive = item.brand === activeTab || activeTab === 'Todos';

    if ((searchPhrase === "" && activeTab === 'Todos') ||
        (isBrandActive && item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim())) ||
        (isBrandActive && item.code.toUpperCase().includes(searchPhrase.toUpperCase().trim())) ) {
      return(
        <View style={styles.item}>
          <ListItem
            text={item.name}
            secondaryText={item.code}
            image={item.image}
            onPress={() => navigation.navigate("AgregarDetalles", {id_product: item.id_product})} />
        </View>
      );
    }
  };

  return(
    <View style={[styles.container, style]}>
      <PageTemplate
        header={
          <ProductSearch
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            tabs={TABS}
            activeTab={activeTab}
            setActiveTab={setActiveTab} />
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

AgregarProducto.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
  bottomNavigation: PropTypes.element,
};
