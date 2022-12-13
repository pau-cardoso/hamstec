import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { neutral } from '../config/colors';
import PageTemplate from '../templates/PageTemplate';
import PageHeader from '../molecules/PageHeader/PageHeader';
import FormGroup from '../molecules/FormGroup/FormGroup';
import TextField from '../atoms/TextField/TextField';
import Card from '../atoms/Card/Card';
import Button from '../atoms/Button/Button';
import TextPairing from '../atoms/TextPairing/TextPairing';
import { showMessage } from 'react-native-flash-message';
import { showErrorMessage } from '../config/utils';

export default function AgregarProductoInstalacion({style, navigation, route}) {
  const [area, setArea] = React.useState("");
  const [voice, setVoice] = React.useState("");
  const [product, setProduct] = React.useState({id: 0, name: ""});
  const [observations, setObservations] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);

  const {idQuote, idSection, idQuoteProduct} = route.params;

  useEffect(() => {
    if (idQuoteProduct !== undefined) {
      setDetails();
      setIsEditing(true);
    }
  }, [])

  function setDetails() {
    fetch('http://localhost:3000/quote-product/' + idQuoteProduct)
      .then((response) => response.json())
      .then((json) => {
        setArea(json.area);
        setVoice(json.voice);
        setProduct({
          id: json.product.id,
          name: json.product.name
        });
        setObservations(json.observations);
      })
      .catch((error) => {console.error(error); showErrorMessage();})
  }

  function deleteProductQuote() {
    fetch('http://localhost:3000/quote-product/' + idQuoteProduct, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    }).catch((error) => {
      console.error(error);
      showErrorMessage();
    }).finally(
      navigation.goBack(),
      route.params.setRefreshing(true)
    );
  }

  function addProductQuote() {
    if (isEditing) {
      fetch('http://localhost:3000/quote-product/' + idQuoteProduct, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product: product.id,
          area: area,
          voice: voice,
          observations: observations,
        })
      }).then(
        showMessage({
          message: 'Producto modificado correctamente',
          type: 'success',
          icon: 'auto'
        })
      ).catch((error) => {
        console.error(error);
        showErrorMessage();
      }).finally(
        navigation.goBack(),
        route.params.setRefreshing(true)
      );
    } else {
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
        showMessage({
          message: 'Producto agregado correctamente',
          type: 'success',
          icon: 'auto'
        })
      ).catch((error) => {
        console.error(error);
        showErrorMessage();
      }).finally(
        navigation.goBack(), route.params.setRefreshing(true)
      );
    }
  }

  return(
    <View style={[styles.container, style]}>
      <PageTemplate
        header={
          <PageHeader
            title='Agregar producto'
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
            { isEditing &&
              <Button
                style={{marginTop: 12}}
                title='Eliminar'
                type='contained'
                textColor='danger'
                onPress={() => deleteProductQuote()}
              />
            }
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
