import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import Button from '../../atoms/Button/Button';
import Card from '../../atoms/Card/Card';
import TextPairing from '../../atoms/TextPairing/TextPairing';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system'
import getQuotePDF from '../../../assets/Cotizacion/CotizacionHtml';
import { neutral, primary } from '../../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconButton from '../../atoms/IconButton/IconButton';
import Table from '../../molecules/Table/Table';
import Row from '../../molecules/Table/Row';
import Cell from '../../molecules/Table/Cell';
import { moderateScale, showErrorMessage } from '../../config/utils';
import { CustomCenteredModal, DeleteModal } from '../../../assets/HelperComponents';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import TextField from '../../atoms/TextField/TextField';

const HEADERS = ['Area', 'Zona', 'Observaciones', 'Cantidad', 'Dispositivo', 'Costo U.', 'Importe'];
const WIDTH = [
  moderateScale(100, 0.2), // Area
  moderateScale(100, 0.2), // Zona
  moderateScale(150, 0.2), // Observaciones
  moderateScale(75, 0.2), // Cantidad
  moderateScale(200, 0.2), // Dispositivo
  moderateScale(80, 0.2), // Costo U
  moderateScale(80, 0.2) // Importe
];

export default function Cotizacion({style, navigation, route}) {
  const [data, setData] = React.useState([]);
  const [projectData, setProjectData] = React.useState();
  const [quoteData, setQuoteData] = React.useState({expenses: 0});
  const [quoteSummary, setQuoteSummary] = React.useState({total: "", anticipo: "", instalacion: "", cost: "", installation: "", utility: ""});
  const [refreshing, setRefreshing] = React.useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [sectionDeleting, setSectionDeleting] = React.useState({id: 0, name: ""});
  const [isChecked, setIsChecked] = React.useState(false);
  const [discountModalVisible, setDiscountModalVisible] = React.useState(false);
  const [discount, setDiscount] = React.useState('');
  const [advanceModalVisible, setAdvanceModalVisible] = React.useState(false);
  const [advance, setAdvance] = React.useState('');

  const tabActive = navigation.isFocused()? 'COTIZACION' : 'INSTALACION';
  const {quoteId, projectId} = route.params;

  const {BASE_URL} = process.env;
  const url = BASE_URL + "quote-product/quote/" + quoteId;

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
    fetch(BASE_URL + "project/" + projectId)
      .then((response) => response.json())
      .then((json) => {
        setProjectData(json);
      })
      .catch((error) => {
        console.error(error);
        showErrorMessage();
      })
    fetch(BASE_URL + "quote/" + quoteId)
      .then((response) => response.json())
      .then((json) => {
        setQuoteData(json);
        setRefreshing(false);
        setDiscount(json.discount.replace(/[^0-9.-]+/g,""));
        setAdvance(json.advance.toString());
      })
      .catch((error) => {
        console.error(error);
        showErrorMessage();
      })
    }, [refreshing]);

  const deleteSection = () => {
    fetch(`${url}/delete-section`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phase: 'COTIZACION',
        section: sectionDeleting.id,
      }),
    }).catch((error) => {
      console.error(error);
      showErrorMessage();
    }).finally(() => {
      setDeleteModalVisible(false);
      setRefreshing(true);
    });
  }

  const addDiscount = () => {
    if ( discount <= Number(quoteData.expenses.replace(/[^0-9.-]+/g,""))) {
      fetch(`${BASE_URL}quote/${quoteId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          discount: discount,
        }),
      }).catch((error) => {
        console.error(error);
        showErrorMessage();
      }).finally(() => {
        setDiscountModalVisible(false);
        setRefreshing(true);
      });

    } else {
      showErrorMessage('El descuento no debe ser mayor a la puesta punto');
    }
  };

  const addAdvance = () => {
    if ( advance <= 100) {
      fetch(`${BASE_URL}quote/${quoteId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          advance: advance,
        }),
      }).catch((error) => {
        console.error(error);
        showErrorMessage();
      }).finally(() => {
        setAdvanceModalVisible(false);
        setRefreshing(true);
      });
    } else {
      showErrorMessage('El anticipo no debe ser mayor a 100');
    }
  };

  let generatePDF = async () => {
    const html = getQuotePDF(data, quoteSummary, projectData, isChecked);
    const file = await Print.printToFileAsync({
      html: html,
    });
    const pdfName = `${file.uri.slice(0,file.uri.lastIndexOf('/')+1)+projectId}_${quoteData.version}_${projectData.name.replace(/\s/g, '')}.pdf`;
    await FileSystem.moveAsync({
      from: file.uri,
      to: pdfName,
    });

    await shareAsync(pdfName);
  }

  const Item = ({ item }) => {
    if (item.product !== null) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'MXN',
        currencyDisplay: 'symbol'
      });
      return(
        <Row>
          <Cell value={item.area} width={WIDTH[0]} />
          <Cell value={item.zone} width={WIDTH[1]} />
          <Cell value={item.observations} width={WIDTH[2]} />
          <Cell value={item.quantity} width={WIDTH[3]} />
          <Cell value={item.product.name} width={WIDTH[4]} />
          <Cell value={item.product.public_price} width={WIDTH[5]} />
          <Cell value={(formatter.format(Number(item.product.public_price.replace(/[^0-9.-]+/g,"")) * item.quantity)).slice(2)} width={WIDTH[6]} />
          <IconButton
            iconName='pencil-sharp'
            size={20}
            style={{alignSelf: 'center'}}
            onPress={ () => navigation.navigate('AgregarDetalles',
              { idQuoteProduct: item.id,
                idQuote: quoteId,
                setRefreshing: setRefreshing,
              })}
          />
        </Row>
      );
    }
  };

  const renderItem = ({ item }) => {
    return (<View style={styles.item}>
      <Card style={{width: '100%'}}>
        <View style={styles.sectionTitle}>
          <TextPairing text={item.name} type='semibold' size={32} />
          <IconButton
            onPress={() => {setSectionDeleting({id: item.id, name: item.name}); setDeleteModalVisible(true);}}
            iconName='trash'
            color={primary.brand}
            size={24}
            style={{marginLeft: moderateScale(4)}}
          />
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={{width: '100%'}}
          showsHorizontalScrollIndicator={false} >

          <Table>
            <Row>
              { HEADERS.map((header, key) => (
                <Cell key={key} value={header} header width={WIDTH[key]} />
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
      <DeleteModal
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        deletedItem={sectionDeleting}
        setRefreshing={setRefreshing}
        secondaryMessage='Esto eliminará todos los productos en esta sección'
        onDeletePress={() => deleteSection()}
      />
      <CustomCenteredModal
        setModalVisible={setDiscountModalVisible}
        modalVisible={discountModalVisible}
        onConfirmPress={() => {addDiscount()}}>
          <TextField value={discount} onChangeText={setDiscount} inputMode='decimal' placeholder='Descuento' />
      </CustomCenteredModal>
      <CustomCenteredModal
        setModalVisible={setAdvanceModalVisible}
        modalVisible={advanceModalVisible}
        onConfirmPress={() => {addAdvance()}}>
          <TextField value={advance} onChangeText={setAdvance} inputMode='numeric' placeholder='% de anticipo' />
      </CustomCenteredModal>
      <FlatList
        data={data}
        contentContainerStyle={{paddingHorizontal: moderateScale(32), paddingTop: moderateScale(22)}}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={() => {setRefreshing(true)}}
        ListFooterComponent={
          <>
            <TouchableOpacity onPress={() => navigation.navigate('AgregarSeccion', { idQuote: quoteId, phase: tabActive, setRefreshing: setRefreshing })}>
              <Card style={styles.addSection}>
                <Ionicons style={{textAlign: 'center', marginRight: moderateScale(10)}} name='add' size={24} color={neutral.s500} />
                <TextPairing text="Agregar sección" color='s500' />
              </Card>
            </TouchableOpacity>
            <View style={styles.cards}>
              <Card style={[styles.marginBottom, styles.card]}>
                <TextPairing text='Resumen de inversión' type='medium' size={24} style={styles.cardTitle} />
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
                <View style={{marginTop: 8}}>
                  <Button
                    title='%  Modificar anticipo'
                    type='contained'
                    textColor='s400'
                    textType='regular'
                    onPress={() => {setAdvanceModalVisible(true)}}
                    style={styles.discountBtn} />
                </View>
              </Card>

              <Card style={styles.card}>
                <TextPairing text='Información de utilidad' type='medium' size={24} style={styles.cardTitle} />
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
                    <TextPairing text='Puesta punto' type='medium' size={16} />
                    <TextPairing text={quoteData.expenses} size={16} />
                  </View>
                  <IconButton
                    iconName='pencil-sharp'
                    size={20}
                    style={{alignSelf: 'center'}}
                    onPress={() => navigation.navigate('ModificarViaticos', {quoteId: quoteId, setRefreshing: setRefreshing})}
                  />
                </View>
                <View style={[styles.textRow, {marginRight: 30}]}>
                  <TextPairing text='Descuento' type='medium' size={16} />
                  <TextPairing text={quoteData.discount} size={16} />
                </View>
                <View style={{marginTop: 8}}>
                  <Button
                    title='Añadir descuento'
                    type='contained'
                    textColor='s400'
                    textType='regular'
                    iconName='add'
                    iconColor={neutral.s400}
                    onPress={() => {setDiscountModalVisible(true)}}
                    style={styles.discountBtn} />
                </View>
              </Card>
            </View>
            <View style={styles.checkboxContainer}>
              <BouncyCheckbox
                disableBuiltInState
                isChecked={isChecked}
                onPress={() => setIsChecked(!isChecked)}
                text="Mostrar precios"
                textStyle={styles.checkboxTextStyle}
                style={{justifyContent: 'center'}}
              />
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
    marginBottom: moderateScale(24),
  },
  cards: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    flexWrap: 'wrap',
    marginTop: moderateScale(24, 0.8),
  },
  card: {
    width: moderateScale(300),
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: moderateScale(8),
  },
  textRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    marginVertical: moderateScale(16),
  },
  icon: {
    justifyContent: 'center',
    aspectRatio: 1/1,
  },
  addSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginBottom: {
    marginBottom: moderateScale(24),
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    margin: 16,
  },
  checkboxTextStyle: {
    fontFamily: "Jost_400Regular",
    textDecorationLine: "none",
    justifyContent: 'center',
    color: neutral.s800,
  },
  discountBtn: {
    backgroundColor: "#F7F8FA",
    width: '100%',
    paddingVertical: 8,
  },
});

Cotizacion.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
  bottomNavigation: PropTypes.element,
};
