import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import Button from '../../atoms/Button/Button';
import Card from '../../atoms/Card/Card';
import TextPairing from '../../atoms/TextPairing/TextPairing';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import getQuotePDF from '../../../assets/Cotizacion/CotizacionHtml';
import { neutral, primary } from '../../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconButton from '../../atoms/IconButton/IconButton';
import Table from '../../molecules/Table/Table';
import Row from '../../molecules/Table/Row';
import Cell from '../../molecules/Table/Cell';
import { showErrorMessage } from '../../config/utils';

const HEADERS = ['Area', 'Zona', 'Observaciones', 'Cantidad', 'Dispositivo', 'Costo U.', 'Importe'];
const FLEX = [1, 1, 2, 1, 3, 1, 1];

export default function Cotizacion({style, navigation, route}) {
  const [data, setData] = React.useState([]);
  const [projectData, setProjectData] = React.useState();
  const [quoteData, setQuoteData] = React.useState({expenses: 0});
  const [quoteSummary, setQuoteSummary] = React.useState({total: "", anticipo: "", instalacion: "", cost: "", installation: "", utility: ""});
  const [refreshing, setRefreshing] = React.useState(false);

  const tabActive = navigation.isFocused()? 'COTIZACION' : 'INSTALACION';
  const {quoteId, projectId} = route.params;
  const url = "http://localhost:3000/quote-product/quote/" + quoteId;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json[0]);
        if (json[1] !== null) {
          setQuoteSummary(json[1]);
        }
      })
      .catch((error) => {
        console.error(error);
        showErrorMessage();
      })
    fetch("http://localhost:3000/project/" + projectId)
      .then((response) => response.json())
      .then((json) => {
        setProjectData(json);
      })
      .catch((error) => {
        console.error(error);
        showErrorMessage();
      })
    fetch("http://localhost:3000/quote/" + quoteId)
      .then((response) => response.json())
      .then((json) => {
        setQuoteData(json);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
        showErrorMessage();
      })
    }, [refreshing]);

  let generatePDF = async () => {
    const html = getQuotePDF(data, quoteSummary, projectData);
    const file = await Print.printToFileAsync({
      html: html,
    });

    await shareAsync(file.uri);
  }

  const Item = ({ item }) => {
    if (item.product !== null) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'MXN',
        currencyDisplay: 'narrowSymbol',
      });
      return(
        <Row>
          <Cell value={item.area} flex={1} />
          <Cell value={item.zone} flex={1} />
          <Cell value={item.observations} flex={2} />
          <Cell value={item.quantity} flex={1} />
          <Cell value={item.product.name} flex={3} />
          <Cell value={item.product.public_price} flex={1} />
          <Cell value={formatter.format(Number(item.product.public_price.replace(/[^0-9.-]+/g,"")) * item.quantity)} flex={1} />
          <IconButton
            iconName='pencil-sharp'
            size={20}
            style={{alignSelf: 'center'}}
            onPress={ () => navigation.navigate('AgregarDetalles',
              { idQuoteProduct: item.id,
                setRefreshing: setRefreshing
              })}
          />
        </Row>
      );
    }
  };

  const renderItem = ({ item }) => {
    return (<View style={styles.item}>
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
          onPress={() => {
            navigation.navigate('AgregarDetalles', { idSection: item.data[0].section.id, idQuote: quoteId, setRefreshing: setRefreshing })}}
          iconName='add'
          type='full'
          color={primary.brand}
          size={24}
        />
      </Card>
    </View>);
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
                  <TextPairing text='Antes de instalación' type='medium' size={16} />
                  <TextPairing text={quoteSummary.instalacion} size={16} />
                </View>
              </Card>

              <Card>
                <TextPairing text='Información de utilidad' type='medium' size={24} style={{marginHorizontal: 24, marginBottom: 8}} />
                <View style={[styles.textRow, {marginRight: 30}]}>
                  <TextPairing text='Costo' type='medium' size={16} />
                  <TextPairing text={quoteSummary.cost} size={16} />
                </View>
                <View style={[styles.textRow, {marginRight: 30}]}>
                  <TextPairing text='Instalación' type='medium' size={16} />
                  <TextPairing text={quoteSummary.installation} size={16} />
                </View>
                <View style={[styles.textRow, {marginRight: 30}]}>
                  <TextPairing text='Utilidad' type='medium' size={16} />
                  <TextPairing text={quoteSummary.utility} size={16} />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={[styles.textRow, {flex: 1, marginRight: 10}]}>
                    <TextPairing text='Viáticos' type='medium' size={16} />
                    <TextPairing text={quoteData.expenses} size={16} />
                  </View>
                  <IconButton
                    iconName='pencil-sharp'
                    size={20}
                    style={{alignSelf: 'center'}}
                    onPress={() => navigation.navigate('ModificarViaticos', {quoteId: quoteId, setRefreshing: setRefreshing})}
                  />
                </View>
              </Card>
            </View>
            <Button style={styles.button} onPress={() => {generatePDF()}} title="Generar PDF" />
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
