import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import PageTemplate from '../../templates/PageTemplate';
import PageHeader from '../../molecules/PageHeader/PageHeader';
import TableSection from '../../organisms/TableSection/TableSection';
import Card from '../../atoms/Card/Card';
import TextPairing from '../../atoms/TextPairing/TextPairing';

const HEADERS = ['Area', 'Zona', 'Observaciones', 'Cantidad', 'Dispositivo', 'Costo U.', 'Importe'];
const FLEX = [1, 1, 2, 1, 3, 1, 1];

export default function Cotizacion({style, navigation, route}) {
  const [data, setData] = React.useState([]);
  const [quoteSummary, setQuoteSummary] = React.useState({total: "", anticipo: "", instalacion: "", cost: "", installation: "", utility: ""});

  const idQuote = route.params.itemId;
  const url = "http://localhost:3000/quote-product/quote/" + idQuote;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(Object.values(json[0]));
        setQuoteSummary(json[1]);
      })
      .catch((error) => console.error(error))
    }, []);

  const renderItem = ({ item }) => {
    const tableData = [];

    item.forEach(element => {
      const row = [];
      row.push(element.zone);
      row.push(element.zone);
      row.push(element.observations);
      row.push(element.quantity);
      row.push(element.product.name);
      row.push(element.product.public_price);
      row.push(Number(element.product.public_price.replace(/[^0-9.-]+/g,"")) * element.quantity);
      tableData.push(row);
    });

    return(
      <View style={styles.item}>
        <TableSection
          section={item[0].section.name}
          headers={HEADERS}
          flexArray={FLEX}
          data={tableData}
          onPressAdd={() =>
            navigation.navigate('AgregarProducto', { idSection: item[0].section.id, idQuote: idQuote, })} />
      </View>
    );
  };

  return(
    <View style={[styles.container, style]}>
      <PageTemplate style={{backgroundColor: ''}}
        header={
          <PageHeader
            title='Proyecto'
            rightButtonIcon='add-circle'
            onPressBackButton={() => navigation.goBack()}
            onRightButtonClick={() => {}} />
        }
        body={
          <FlatList
            data={data}
            renderItem={renderItem}
            ListFooterComponent={
              <View style={styles.cards}>
                <Card style={styles.card}>
                  <TextPairing text='Resumen de inversión' type='medium' size={24} />
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

                <Card style={styles.card}>
                  <TextPairing text='Información de utilidad' type='medium' size={24} />
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
            }
          />
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
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  card: {
    width: '70%',
    alignItems: 'center',
  },
  textRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

Cotizacion.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
  bottomNavigation: PropTypes.element,
};
