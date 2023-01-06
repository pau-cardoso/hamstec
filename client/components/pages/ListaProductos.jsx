import React, { useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import ProductSearch from '../organisms/ProductSearch/ProductSearch';
import PageTemplate from '../templates/PageTemplate';
import Card from '../atoms/Card/Card';
import Row from '../molecules/Table/Row';
import Cell from '../molecules/Table/Cell';

export default function ListaProductos({style, navigation, route}) {
  const [data, setData] = React.useState();
  const [tabs, setTabs] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Todos");
  const [searchPhrase, setSearchPhrase] = React.useState("");

  useEffect(() => {
    fetch('http://localhost:3000/product')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
    fetch('http://localhost:3000/brand')
      .then((response) => response.json())
      .then((json) => {
        const brands = ["Todos"].concat(json.map(brand => brand.name));
        setTabs(brands);
      })
      .catch((error) => console.error(error))
    setRefreshing(false);
  }, [refreshing]);

  const renderItem = ({ item }) => {
    const isBrandActive = item.brand.name === activeTab || activeTab === 'Todos';

    if ((searchPhrase === "" && activeTab === 'Todos') ||
        (isBrandActive && item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim())) ||
        (isBrandActive && item.code.toUpperCase().includes(searchPhrase.toUpperCase().trim())) ) {
      return(
        <TouchableOpacity style={styles.item} onPress={() => {navigation.navigate('DetalleProducto', {productId: item.id, setRefreshing: setRefreshing})}}>
          <Row>
            <Cell value={item.brand.name} />
            <Cell value={item.code} />
            <Cell value={item.name} flex={2} />
            <Cell value={item.description} flex={2} />
            <Cell value={item.price} />
            <Cell value={item.installation} />
            <Cell value={item.public_price} />
            <Cell value={item.utility} />
          </Row>
        </TouchableOpacity>
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
            tabs={tabs}
            title='Lista de productos'
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onRightButtonClick={() => navigation.navigate('AgregarProducto', {setRefreshing: setRefreshing})}
            rightButtonIcon='add-circle' />
        }
        body={
          <Card style={{flex: 1, marginBottom: 24}} >
            <Row>
              <Cell value='Marca' header />
              <Cell value='Clave' header />
              <Cell value='Dispositivo' header flex={2} />
              <Cell value='Descripción' header flex={2} />
              <Cell value='Costo' header />
              <Cell value='Instalación' header />
              <Cell value='Precio público' header />
              <Cell value='Utilidad' header />
            </Row>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </Card>
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
});
