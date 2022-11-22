import React from 'react';
import { StyleSheet, View } from 'react-native';
import { neutral } from '../config/colors';
import PageTemplate from '../templates/PageTemplate';
import PageHeader from '../molecules/PageHeader/PageHeader';
import FormGroup from '../molecules/FormGroup/FormGroup';
import TextField from '../atoms/TextField/TextField';
import Card from '../atoms/Card/Card';
import Button from '../atoms/Button/Button';
import TextPairing from '../atoms/TextPairing/TextPairing';

export default function AgregarProductoInstalacion({style, navigation, route}) {
  const [area, setArea] = React.useState("");
  const [voice, setVoice] = React.useState("");
  const [product, setProduct] = React.useState({id: 0, name: ""});
  const [observations, setObservations] = React.useState("");

  const {idQuote, idSection, idProduct} = route.params;

  function addProductQuote() {
    fetch('http://localhost:3000/quote-product', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product: product.id,
        quote: idQuote,
        section: idSection,
        area: area,
        voice: voice,
        observations: observations,
        phase: "INSTALACION",
      })
    }).then(
      // console.log('Success!!')
    ).catch((error) => {
      console.error(error);
    }).finally(
      navigation.goBack(), route.params.setRefreshing(true)
    )
  }

  return(
    <View style={[styles.container, style]}>
      <PageTemplate
        header={
          <PageHeader
            title='Agregar producto' // TODO: Add clicked product info
            onPressBackButton={() => {navigation.goBack()}} />
        }
        body={
          <Card>
            <FormGroup onPressSave={() => {addProductQuote()}}>
              <TextField value={area} onChangeText={setArea} title='Area' placeholder='Area' />
              <TextField value={voice} onChangeText={setVoice} title='Voz' placeholder='Voz' />
              <View>
                <TextPairing style={{marginBottom: 4}} text={'Producto'} type='medium' size={14} color='s400' />
                <Button
                  onPress={() => {navigation.navigate("AgregarProductoCotizacion", {setProduct: setProduct})}}
                  textColor={product.name != ""? 's800' : 's200'}
                  title={product.name != ""? product.name : 'Producto'}
                  type='textInput' />
              </View>
              <TextField value={observations} onChangeText={setObservations} title='Observaciones' placeholder='Observaciones' />
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
