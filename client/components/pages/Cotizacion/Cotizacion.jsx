import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import PageTemplate from '../../templates/PageTemplate';
import PageHeader from '../../molecules/PageHeader/PageHeader';
import TableSection from '../../organisms/TableSection/TableSection';

const HEADERS = ['Area', 'Zona', 'Observaciones', 'Cantidad', 'Dispositivo', 'Costo U.', 'Importe'];
const FLEX = [1, 1, 2, 1, 3, 1, 1];

export default function Cotizacion({style, navigation, route}) {
  const [data, setData] = React.useState([]);

  const url = "http://localhost:3000/quote-product/quote/" + route.params.itemId;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(Object.values(json))
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
      row.push(element.id_product.name);
      row.push(element.id_product.public_price);
      row.push(Number(element.id_product.public_price.replace(/[^0-9.-]+/g,"")) * element.quantity);
      tableData.push(row);
    });

    return(
      <View style={styles.item}>
        <TableSection
          section={item[0].id_section.name}
          headers={HEADERS}
          flexArray={FLEX}
          data={tableData}
          onPressAdd={() =>{ navigation.navigate('AgregarProducto')}} />
      </View>
    );
  };

  return(
    <View style={[styles.container, style]}>
      <PageTemplate
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
  },
  item: {
    marginBottom: 24,
  }
});

Cotizacion.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
  bottomNavigation: PropTypes.element,
};
