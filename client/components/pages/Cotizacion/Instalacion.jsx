import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Card from '../../atoms/Card/Card';
import { Ionicons } from '@expo/vector-icons';
import TableSection from '../../organisms/TableSection/TableSection';
import { neutral } from '../../config/colors';
import TextPairing from '../../atoms/TextPairing/TextPairing';

const HEADERS = ['Área', 'No. App', 'Clave', 'Dispositivo', 'Voz', 'Observaciones'];
const FLEX = [1, 1, 1, 2, 1, 2];

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
        setData(Object.values(json));
      })
      .catch((error) => console.error(error))
      .finally(setRefreshing(false))
    }, [refreshing]);

  const renderItem = ({ item }) => {
    const tableData = [];

    for (let i = 0; i < item.length; i++) {
      const element = item[i];
      if (element.product === null) {
        continue;
      }
      const row = [];
      row.push(element.area);
      row.push(element.product.code);
      row.push(element.product.code);
      row.push(element.product.name);
      row.push(element.voice);
      row.push(element.observations);
      tableData.push(row);
    }

    return(
      <View style={styles.item}>
        <TableSection
          section={item[0].section.name}
          headers={HEADERS}
          flexArray={FLEX}
          data={tableData}
          onPressAdd={() =>
            navigation.navigate('AgregarProductoInstalacion', { idSection: item[0].section.id, idQuote: quoteId, setRefreshing: setRefreshing })} />
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
