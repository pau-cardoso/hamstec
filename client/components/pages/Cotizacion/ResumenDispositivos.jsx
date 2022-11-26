import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../../atoms/Card/Card';
import Table from '../../molecules/Table/Table';
import Row from '../../molecules/Table/Row';
import Cell from '../../molecules/Table/Cell';
import TextPairing from '../../atoms/TextPairing/TextPairing';

const HEADERS = ['Marca', 'Clave', 'Dispositivo', 'Instalado', 'Contratado', 'Diferencia', 'Estado'];
const FLEX = [1, 1, 2, 1, 1, 1, 1];

export default function ResumenDispositivos({style, navigation, route}) {
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const {quoteId} = route.params;
  const url = "http://localhost:3000/quote-product/count/" + quoteId;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(Object.values(json));
      })
      .catch((error) => console.error(error))
      .finally(setRefreshing(false))
    }, [refreshing]);

  const tableData = [];
  let totalHired = 0;
  let totalInstalled = 0;

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    let installed = 0;
    let hired = 0;

    element.forEach(phase => {
      if (phase.quoteProduct_phase === 'COTIZACION') {
        hired += parseInt(phase.productCount)
        totalHired += parseInt(phase.productCount)
      } else if (phase.quoteProduct_phase === 'INSTALACION') {
        installed += parseInt(phase.productCount)
        totalInstalled += parseInt(phase.productCount)
      }
    });

    const row = [];
    row.push(element[0].brand_name);
    row.push(element[0].product_code);
    row.push(element[0].product_name);
    row.push(installed);
    row.push(hired);
    row.push(installed-hired);
    row.push('');
    tableData.push(row);
  }

  return(
    <View style={[styles.container, style]}>
      <ScrollView style={{paddingHorizontal: 32, paddingTop: 22}}>
        <Card>
          <Table>
            <Row>
              { HEADERS.map((header, key) => (
                <Cell key={key} value={header} header flex={FLEX[key]} />
                ))}
            </Row>
            { tableData.map((row, key) => (
              <Row key={key}>
                {row.map((cell, key) => (
                  <Cell key={key} value={cell} flex={FLEX[key]} />
                ))}
              </Row>
            ))}
          </Table>
        </Card>
        <View style={styles.cards}>
          <Card style={{marginTop: 24}}>
            <TextPairing text='Total dispositivos' type='medium' size={24} style={{marginHorizontal: 64, marginBottom: 8}} />
            <View style={styles.textRow}>
              <TextPairing text='Instalado' type='medium' size={16} />
              <TextPairing text={totalInstalled} size={16} />
            </View>
            <View style={styles.textRow}>
              <TextPairing text='Contratado' type='medium' size={16} />
              <TextPairing text={totalHired} size={16} />
            </View>
            <View style={styles.textRow}>
              <TextPairing text='Diferencia' type='medium' size={16} />
              <TextPairing text={totalInstalled-totalHired} size={16} />
            </View>
            <View style={styles.textRow}>
              <TextPairing text='Estado' type='medium' size={16} />
              <TextPairing text='' size={16} />
            </View>
            <View style={styles.textRow}>
              <TextPairing text='Diferencia MXN' type='medium' size={16} />
              <TextPairing text='' size={16} />
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flex: 1,
  },
  textRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 4,
  },
  cards: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});
