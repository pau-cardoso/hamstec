import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import TableSection from '../../organisms/TableSection/TableSection';

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
            navigation.navigate('AgregarProductoCotizacion', { idSection: item[0].section.id, idQuote: quoteId, setRefreshing: setRefreshing })} />
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
});
