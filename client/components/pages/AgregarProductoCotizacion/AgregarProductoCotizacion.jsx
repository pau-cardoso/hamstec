import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import PageTemplate from '../../templates/PageTemplate';
import ProductSearch from '../../organisms/ProductSearch/ProductSearch';
import ListItem from '../../molecules/ListItem/ListItem';

export default function AgregarProductoCotizacion({route, navigation, style}) {
  const TABS = ['Todos', 'Broadlink', 'ORVIBO', 'Amazon'];
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("Todos");
  const [data, setData] = React.useState([]);

  const url = "http://localhost:3000/product/";
  const {setProduct} = route.params;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json)
      })
      .catch((error) => console.error(error))
  }, []);

  const renderItem = ({ item }) => {
    const isBrandActive = item.brand.name === activeTab || activeTab === 'Todos';

    if ((searchPhrase === "" && activeTab === 'Todos') ||
        (isBrandActive && item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim())) ||
        (isBrandActive && item.code.toUpperCase().includes(searchPhrase.toUpperCase().trim())) ) {
      return(
        <View style={styles.item}>
          <ListItem
            text={item.name}
            secondaryText={item.code}
            image={item.image}
            onPress={() => {
              setProduct({id: item.id, name: item.name});
              navigation.goBack();
            }} />
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
            title={'Agregar Producto'}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
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

AgregarProductoCotizacion.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
  bottomNavigation: PropTypes.element,
};
