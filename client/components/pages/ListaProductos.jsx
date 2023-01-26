import React, { useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import ProductSearch from '../organisms/ProductSearch/ProductSearch';
import PageTemplate from '../templates/PageTemplate';
import Card from '../atoms/Card/Card';
import Row from '../molecules/Table/Row';
import Cell from '../molecules/Table/Cell';
import Table from '../molecules/Table/Table';
import { moderateScale } from '../config/utils';

const WIDTH = [moderateScale(90), moderateScale(90), moderateScale(150), moderateScale(200), moderateScale(100), moderateScale(90), moderateScale(100), moderateScale(85)];
const HEADERS = ['Marca', 'Clave', 'Dispositivo', 'Descripción', 'Costo', 'Instalación', 'Precio público', 'Utilidad'];

export default function ListaProductos({style, navigation, route}) {
  const [data, setData] = React.useState();
  const [tabs, setTabs] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Todos");
  const [searchPhrase, setSearchPhrase] = React.useState("");

  const {PROD_API} = process.env;

  useEffect(() => {
    fetch(PROD_API + 'product')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
    fetch(PROD_API + 'brand')
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
            <Cell value={item.brand.name} width={WIDTH[0]} />
            <Cell value={item.code} width={WIDTH[1]} />
            <Cell value={item.name} width={WIDTH[2]} />
            <Cell value={item.description} width={WIDTH[3]} />
            <Cell value={item.price} width={WIDTH[4]} />
            <Cell value={item.installation} width={WIDTH[5]} />
            <Cell value={item.public_price} width={WIDTH[6]} />
            <Cell value={item.utility} width={WIDTH[7]} />
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
          <Card style={{flex: 1, marginBottom: moderateScale(8)}} >
            <Table>
              <Row>
                { HEADERS.map((header, key) => (
                  <Cell key={key} value={header} header width={WIDTH[key]} />
                ))}
              </Row>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </Table>
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
