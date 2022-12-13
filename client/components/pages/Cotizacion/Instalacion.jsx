import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Card from '../../atoms/Card/Card';
import { Ionicons } from '@expo/vector-icons';
import { neutral, primary } from '../../config/colors';
import TextPairing from '../../atoms/TextPairing/TextPairing';
import Row from '../../molecules/Table/Row';
import Cell from '../../molecules/Table/Cell';
import IconButton from '../../atoms/IconButton/IconButton';
import Table from '../../molecules/Table/Table';

const HEADERS = ['Área', 'No. App', 'Clave', 'Dispositivo', 'Voz', 'Observaciones'];
const FLEX = [1, 1, 1, 2, 1, 2];
const WIDTH = [36, 36, 36, 36, 36, 42]

export default function Instalacion({style, navigation, route}) {
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const {quoteId} = route.params;
  const url = "http://localhost:3000/quote-product/quote-installed/" + quoteId;
  const tabActive = navigation.isFocused()? 'INSTALACION' : 'COTIZACION';

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => console.error(error))
      .finally(setRefreshing(false))
    }, [refreshing]);

  const Item = ({ item }) => {
    if (item.product !== null) {
      return(
        <Row>
          <Cell value={item.area} flex={1} />
          <Cell value={item.product.code} flex={1} />
          <Cell value={item.product.code} flex={1} />
          <Cell value={item.product.name} flex={2} />
          <Cell value={item.voice} flex={1} />
          <Cell value={item.observations} flex={2} />
          <IconButton
            iconName='pencil-sharp'
            size={20}
            style={{alignSelf: 'center'}}
            onPress={ () => navigation.navigate('AgregarProductoInstalacion',
              { idQuoteProduct: item.id,
                setRefreshing: setRefreshing
              }) }
          />
        </Row>
      );
    }
  };

  const renderItem = ({ item }) => {
    return(
      <View style={styles.item}>
        <Card style={{width: '100%'}}>
          <TextPairing text={item.name} type='semibold' size={32} style={{marginBottom: 8}} />
          <ScrollView
            horizontal
            contentContainerStyle={{width: '100%'}}
            showsHorizontalScrollIndicator={false} >

            <Table>
              <Row>
                { HEADERS.map((header, key) => (
                  <Cell key={key} value={header} header flex={FLEX[key]} />
                ))}
                <View style={{width: 20}} />
              </Row>
              { item.data.map((product, key) => (
                <Item key={key} item={product} />
              ))}
            </Table>

          </ScrollView>
          <IconButton
            onPress={() => navigation.navigate('AgregarProductoInstalacion', { idSection: item.data[0].section.id, idQuote: quoteId, setRefreshing: setRefreshing })}
            iconName='add'
            type='full'
            color={primary.brand}
            size={24}
          />
        </Card>
      </View>
    );
  };

  return(
    <View style={[styles.container, style]}>
      <FlatList
        data={data}
        contentContainerStyle={{paddingHorizontal: 32, paddingTop: 22}}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={() => {setRefreshing(true)}}
        ListFooterComponent={
          <TouchableOpacity style={{marginBottom: 24}} onPress={() => navigation.navigate('AgregarSeccion', { idQuote: quoteId, phase: tabActive, setRefreshing: setRefreshing })}>
            <Card style={styles.addSection}>
              <Ionicons style={{textAlign: 'center', marginRight: 10}} name='add' size={24} color={neutral.s500} />
              <TextPairing text="Agregar sección" color='s500' />
            </Card>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flex: 1,
  },
  item: {
    marginBottom: 24,
  },
  addSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
