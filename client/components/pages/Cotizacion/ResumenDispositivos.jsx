import 'intl';
import React, { useEffect } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import Card from '../../atoms/Card/Card';
import Row from '../../molecules/Table/Row';
import Cell from '../../molecules/Table/Cell';
import TextPairing from '../../atoms/TextPairing/TextPairing';
import { neutral } from '../../config/colors';
import Table from '../../molecules/Table/Table';
import { moderateScale } from '../../config/utils';
import { ScrollView } from 'react-native-gesture-handler';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system'
import getSummaryPDF from '../../../assets/Cotizacion/ResumenDispositivos';
import Button from '../../atoms/Button/Button';
import { IntlProvider, FormattedNumber } from 'react-intl';

const HEADERS = ['Marca', 'Clave', 'Dispositivo', 'Instalado', 'Contratado', 'Diferencia', 'Estado'];
const WIDTH = [
  moderateScale(80, 0.25), // Marca
  moderateScale(80, 0.25), // Clave
  moderateScale(275, 0.25), // Dispositivo
  moderateScale(85, 0.25), // Instalado
  moderateScale(85, 0.25), // Contratado
  moderateScale(85, 0.25), // Diferencia
  moderateScale(80, 0.25), // Estado
];

export default function ResumenDispositivos({style, navigation, route}) {
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const {BASE_URL} = process.env;
  const {quoteId} = route.params;
  let tableData = new Array(0);

  useEffect(() => {
    fetch(`${BASE_URL}quote-product/count/${quoteId}`)
      .then((response) => response.json())
      .then((json) => {
        setData(Object.values(json));
      })
      .catch((error) => console.error(error))
      .finally(setRefreshing(false))
    }, [refreshing]);

  let totalHired = 0;
  let totalInstalled = 0;
  let priceDifference = 0;
  let tableHtml = '';

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    let installed = 0;
    let hired = 0;

    element.forEach(phase => {
      if (phase.quoteProduct_phase === 'COTIZACION') {
        hired += parseInt(phase.product_count)
        totalHired += parseInt(phase.product_count)
        priceDifference += parseInt(phase.product_count) * Number(phase.product_public_price.replace(/[^0-9.-]+/g,""))
      } else if (phase.quoteProduct_phase === 'INSTALACION') {
        installed += parseInt(phase.product_count)
        totalInstalled += parseInt(phase.product_count)
        priceDifference -= parseInt(phase.product_count) * Number(phase.product_public_price.replace(/[^0-9.-]+/g,""))
      }
    });
    const row = new Array(0);
    tableHtml += `
      <tr class="data">
        <td>${element[0].brand_name}</td>
        <td>${element[0].product_code}</td>
        <td>${element[0].product_name}</td>
        <td>${installed}</td>
        <td>${hired}</td>
        <td>${hired-installed}</td>
        <td>${(hired-installed) > 0? 'Sobrante' : (hired-installed) < 0? 'Faltante' : ''}</td>
      </tr>
    `;
    row.push(element[0].brand_name);
    row.push(element[0].product_code);
    row.push(element[0].product_name);
    row.push(installed);
    row.push(hired);
    row.push(hired-installed);
    row.push((hired-installed) > 0? 'Sobrante' : (hired-installed) < 0? 'Faltante' : '');
    tableData.push(row);
  }

  const Item = ({ item }) => (
    <Row style={styles.cardRow}>
      {item.map((cell, key) => (
        <Cell key={key} value={cell} width={WIDTH[key]} />
      ))}
    </Row>
  );

  const generatePDF = async () => {
    const html = getSummaryPDF(tableHtml);
    const file = await Print.printToFileAsync({
      html: html,
    });
    const pdfName = `${file.uri.slice(0,file.uri.lastIndexOf('/')+1)}Summary.pdf`;
    await FileSystem.moveAsync({
      from: file.uri,
      to: pdfName,
    });
    await shareAsync(pdfName);
  };

  return(
    <IntlProvider locale="en">
      <View style={[styles.container, style]}>
        <ScrollView
          contentContainerStyle={{justifyContent: 'center'}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)} />
          }>
          <Table>
            <Row style={styles.cardRow}>
              { HEADERS.map((header, key) => (
                <Cell key={key} value={header} header width={WIDTH[key]} />
              ))}
            </Row>
            { Array.from(tableData).map((product, key) => (
              <Item key={key} item={product} />
            ))}
          </Table>
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
                <TextPairing text={(totalHired-totalInstalled) > 0? 'Sobrante' : (totalHired-totalInstalled) < 0? 'Faltante' : ''} size={16} />
              </View>
              <View style={styles.textRow}>
                <TextPairing text='Diferencia MXN' type='medium' size={16} />
                <TextPairing text={
                  <FormattedNumber
                    value={Math.abs(priceDifference)}
                    style="currency"
                    currency="USD"
                  />
                } size={16} />
              </View>
            </Card>
          </View>
          <View style={styles.pdfBtn}>
            <Button title='Generar PDF' onPress={() => {generatePDF()}} />
          </View>
        </ScrollView>
      </View>
    </IntlProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flex: 1,
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(20)
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
    marginBottom: 16,
  },
  cardRow: {
    padding: 8,
    paddingHorizontal: 16,
    marginBottom: 4,
    backgroundColor: neutral.white,
    borderRadius: 10,
  },
  pdfBtn: {
    marginBottom: 16,
  },
});
