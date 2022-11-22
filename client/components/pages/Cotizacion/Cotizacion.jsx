import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import TableSection from '../../organisms/TableSection/TableSection';
import Button from '../../atoms/Button/Button';
import Card from '../../atoms/Card/Card';
import TextPairing from '../../atoms/TextPairing/TextPairing';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import getQuotePDF from '../../../assets/Cotizacion/CotizacionHtml';
import { neutral } from '../../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HEADERS = ['Area', 'Zona', 'Observaciones', 'Cantidad', 'Dispositivo', 'Costo U.', 'Importe'];
const FLEX = [1, 1, 2, 1, 3, 1, 1];

export default function Cotizacion({style, navigation, route}) {
  const [data, setData] = React.useState([]);
  const [projectData, setProjectData] = React.useState();
  const [quoteSummary, setQuoteSummary] = React.useState({total: "", anticipo: "", instalacion: "", cost: "", installation: "", utility: ""});
  const [refreshing, setRefreshing] = React.useState(false);

  const tabActive = navigation.isFocused()? 'COTIZACION' : 'INSTALACION';
  const {quoteId, projectId} = route.params;
  const url = "http://localhost:3000/quote-product/quote/" + quoteId;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(Object.values(json[0]));
        setQuoteSummary(json[1]);
      })
      .catch((error) => console.error(error))
    fetch("http://localhost:3000/project/" + projectId)
      .then((response) => response.json())
      .then((json) => {
        setProjectData(json);
        setRefreshing(false);
      })
      .catch((error) => console.error(error))
    }, [refreshing]);

  let generatePDF = async () => {
    const html = getQuotePDF(data, quoteSummary, projectData);
    const file = await Print.printToFileAsync({
      html: html,
    });

    await shareAsync(file.uri);
  }

  const renderItem = ({ item }) => {
    const tableData = [];
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'MXN',
      currencyDisplay: 'narrowSymbol',
    });

    for (let i = 0; i < item.length; i++) {
      const element = item[i];
      if (element.product === null) {
        continue;
      }
      const row = [];
      row.push(element.area);
      row.push(element.zone);
      row.push(element.observations);
      row.push(element.quantity);
      row.push(element.product.name);
      row.push(element.product.public_price);
      row.push(formatter.format(Number(element.product.public_price.replace(/[^0-9.-]+/g,"")) * element.quantity));
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
            navigation.navigate('AgregarDetalles', { idSection: item[0].section.id, idQuote: quoteId, setRefreshing: setRefreshing })} />
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
          <>
            <TouchableOpacity style={{marginBottom: 24}} onPress={() => navigation.navigate('AgregarSeccion', { idQuote: quoteId, phase: tabActive, setRefreshing: setRefreshing })}>
              <Card style={styles.addSection}>
                <Ionicons style={{textAlign: 'center', marginRight: 10}} name='add' size={24} color={neutral.s500} />
                <TextPairing text="Agregar sección" color='s500' />
              </Card>
            </TouchableOpacity>
            <View style={styles.cards}>
              <Card>
                <TextPairing text='Resumen de inversión' type='medium' size={24} style={{marginHorizontal: 24, marginBottom: 8}} />
                <View style={styles.textRow}>
                  <TextPairing text='Total' type='medium' size={16} />
                  <TextPairing text={quoteSummary.total} size={16} />
                </View>
                <View style={styles.textRow}>
                  <TextPairing text='Anticipo' type='medium' size={16} />
                  <TextPairing text={quoteSummary.anticipo} size={16} />
                </View>
                <View style={styles.textRow}>
                  <TextPairing text='Antes de instalacion' type='medium' size={16} />
                  <TextPairing text={quoteSummary.instalacion} size={16} />
                </View>
              </Card>

              <Card>
                <TextPairing text='Información de utilidad' type='medium' size={24} style={{marginHorizontal: 24, marginBottom: 8}} />
                <View style={styles.textRow}>
                  <TextPairing text='Costo' type='medium' size={16} />
                  <TextPairing text={quoteSummary.cost} size={16} />
                </View>
                <View style={styles.textRow}>
                  <TextPairing text='Instalacion' type='medium' size={16} />
                  <TextPairing text={quoteSummary.installation} size={16} />
                </View>
                <View style={styles.textRow}>
                  <TextPairing text='Utilidad' type='medium' size={16} />
                  <TextPairing text={quoteSummary.utility} size={16} />
                </View>
              </Card>
            </View>
            <View>
            <Button style={styles.button} onPress={() => {generatePDF()}} title="Generar PDF" />
            </View>
          </>
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
  cards: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  textRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    marginVertical: 16,
  },
  icon: {
    justifyContent: 'center',
    aspectRatio: "1 / 1",
  },
  addSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

Cotizacion.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
  bottomNavigation: PropTypes.element,
};
