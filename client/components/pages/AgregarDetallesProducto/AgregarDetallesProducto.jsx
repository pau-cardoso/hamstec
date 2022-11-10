import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { neutral } from '../../config/colors';
import PageTemplate from '../../templates/PageTemplate';
import PageHeader from '../../molecules/PageHeader/PageHeader';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import TextField from '../../atoms/TextField/TextField';
import Card from '../../atoms/Card/Card';

export default function AgregarDetallesProducto({style, navigation, route}) {
  const [zone, setZone] = React.useState("");
  const [area, setArea] = React.useState("");
  const [observations, setObservations] = React.useState("");
  const [note, setNotes] = React.useState("");
  const [quantity, setQuantity] = React.useState("1");

  const {idQuote, idSection, idProduct} = route.params;

  function addProductQuote() {
    fetch('http://localhost:3000/quote-product', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product: idProduct,
        quote: idQuote,
        section: idSection,
        quantity: quantity,
        zone: zone,
        observations: observations,
        phase: "COTIZACION",
      })
    }).then(
      // console.log('Success!!')
    ).catch((error) => {
      console.error(error);
    }).finally(
      navigation.pop(2), route.params.setRefreshing(true)
    )
  }

  return(
    <View style={[styles.container, style]}>
      <PageTemplate
        header={
          <PageHeader
            title='Apagador Touch Classic 1 Gang' // TODO: Add clicked product info
            onPressBackButton={() => {navigation.goBack()}} />
        }
        body={
          <Card>
            <FormGroup onPressSave={() => {addProductQuote()}}>
              <TextField value={zone} onChangeText={setZone} title='Zona' placeholder='Zona' />
              <TextField value={area} onChangeText={setArea} title='Area' placeholder='Area' />
              <TextField value={observations} onChangeText={setObservations} title='Observaciones' placeholder='Observaciones' />
              <TextField value={note} onChangeText={setNotes} title='Notas' placeholder='Notas' />
              <TextField value={quantity} onChangeText={setQuantity} title='Cantidad' placeholder='Cantidad' type='quantity' keyboardType="numeric" />
            </FormGroup>
          </Card>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: neutral.s050,
  },
  item: {
    marginBottom: 12,
  }
});

AgregarDetallesProducto.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
  bottomNavigation: PropTypes.element,
};
