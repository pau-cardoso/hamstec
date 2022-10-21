import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView } from 'react-native';
import Card from '../../atoms/Card/Card'
import TextPairing from '../../atoms/TextPairing/TextPairing';
import Table from '../../molecules/Table/Table';
import Row from '../../molecules/Table/Row';
import Cell from '../../molecules/Table/Cell';
import IconButton from '../../atoms/IconButton/IconButton';
import { primary } from '../../config/colors';

export default function TableSection({section, headers, data, onPressAdd, style}) {

  return(
    <Card>
      <View style={styles.container}>
        <TextPairing text={section} type='semibold' size={32} style={{marginBottom: 8}} />
        <ScrollView
          horizontal
          contentContainerStyle={{width: '100%'}}
          showsHorizontalScrollIndicator={false} >

          <Table>
            <Row>
              <Cell value='Área' header />
              <Cell value='Zona' header />
              <Cell value='Observaciones' header flex={2} />
              <Cell value='Cantidad' header />
              <Cell value='Dispositivo' header flex={3} />
              <Cell value='Costo U.' header />
              <Cell value='Importe' header />
            </Row>
            <Row>
              <Cell value='Entrada' />
              <Cell value='Pasillo' />
              <Cell value='Cerradura C1' flex={2} />
              <Cell value='2' />
              <Cell value='CERRADURA C1 WIFI' flex={3} />
              <Cell value='$380.00' />
              <Cell value='$760.00' />
            </Row>
            <Row>
              <Cell value='Entrada' />
              <Cell value='Pasillo' />
              <Cell value='Cerradura C1' flex={2} />
              <Cell value='2' />
              <Cell value='CERRADURA C1 WIFI' flex={3} />
              <Cell value='$380.00' />
              <Cell value='$760.00' />
            </Row>
            <Row>
              <Cell value='Entrada' />
              <Cell value='Pasillo' />
              <Cell value='Cerradura C1' flex={2} />
              <Cell value='2' />
              <Cell value='CERRADURA C1 WIFI' flex={3} />
              <Cell value='$380.00' />
              <Cell value='$760.00' />
            </Row>
          </Table>
        </ScrollView>
        <IconButton onPress={() => {}} iconName='add' type='full' color={primary.brand} size={24} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
  },
});

TableSection.defaultProps = {
  onPressAdd: () => {},
};

TableSection.propTypes = {
  section: PropTypes.string.isRequired,
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onPressAdd: PropTypes.func
};
