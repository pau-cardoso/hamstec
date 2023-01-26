import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ModalTemplate from '../templates/ModalTemplate';
import PageHeader from '../molecules/PageHeader/PageHeader';
import FormGroup from '../molecules/FormGroup/FormGroup';
import TextField from '../atoms/TextField/TextField';
import SearchableSelect from '../molecules/SearchableSelect/SearchableSelect';
import { ScrollView } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import { showErrorMessage } from '../config/utils';
import Button from '../atoms/Button/Button';

export default function AgregarProducto({route, navigation, style}) {
  const [brand, setBrand] = React.useState({id:0, name: ""});
  const [brandData, setBrandData] = React.useState([]);
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [image, setImage] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [installation, setInstallation] = React.useState("");
  const [utility, setUtility] = React.useState("");
  const [publicPrice, setPublicPrice] = React.useState("");

  const {PROD_API} = process.env;
  const isEditing = route.params.product != undefined;

  function setProduct() {
    const product = route.params.product;
    setBrand(product.brand);
    setName(product.name);
    setCode(product.code);
    setImage(product.image);
    setDescription(product.description);
    setPrice(product.price);
    setInstallation(product.installation);
    setUtility(product.utility);
    setPublicPrice(product.public_price);
  }

  useEffect(() => {
    if (route.params.product != undefined) {
      setProduct();
    }
    fetch(PROD_API + 'brand')
      .then((response) => response.json())
      .then((json) => setBrandData(json))
      .catch((error) => {console.error(error); showErrorMessage();})
  }, []);

  function deleteProduct() {
    fetch(PROD_API + 'product/' + route.params.product.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        deleted: true,
      })
    }).catch((error) => {
      console.error(error);
      showErrorMessage();
    }).finally(() => {
      route.params.refreshList(true);
      navigation.pop(2);
    });
  }

  function addProduct() {
    if (route.params.product != undefined) {
      fetch(PROD_API + 'product/' + route.params.product.id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          code: code,
          image: image,
          description: description,
          price: price,
          installation: installation,
          utility: utility,
          public_price: publicPrice,
          brand: brand.id,
        })
      }).then(() =>
        showMessage({
          message: 'Producto modificado correctamente',
          type: 'success',
          icon: 'auto'
        })
      ).catch((error) => {
        console.error(error);
        showErrorMessage();
      }).finally(() => {
        navigation.goBack();
        route.params.setRefreshing(true);
      });
    } else {
      fetch(PROD_API + 'product', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          code: code,
          image: image,
          description: description,
          price: price,
          installation: installation,
          utility: utility,
          public_price: publicPrice,
          brand: brand.id,
        })
      }).then(
        showMessage({
          message: 'Producto creado correctamente',
          type: 'success',
          icon: 'auto'
        })
      ).catch((error) => {
        console.error(error);
        showErrorMessage();
      }).finally(() => {
        navigation.goBack();
        route.params.setRefreshing(true);
      });
    }
  };

  return(
    <View style={[styles.container, style]}>
      <ModalTemplate
        header={
          <PageHeader
            title='Agregar producto'
            rightButtonIcon='ios-close'
            onRightButtonClick={() => navigation.goBack()}
          />
        }
        body={
          <ScrollView>
            <FormGroup onPressSave={() => addProduct()} style={{padding: 0}} >
              <TextField value={name} onChangeText={setName} title='Nombre' placeholder='Nombre' />
              <TextField value={code} onChangeText={setCode} title='Código' placeholder='Código' />
              <TextField value={image} onChangeText={setImage} title='Imagen' placeholder='Imagen' />
              <TextField value={description} onChangeText={setDescription} title='Descripción' placeholder='Descripción' multiline />
              <TextField value={price} onChangeText={setPrice} title='Costo' placeholder='Costo' keyboardType="numeric" />
              <TextField value={installation} onChangeText={setInstallation} title='Instalación' placeholder='Instalación' keyboardType="numeric" />
              <TextField value={utility} onChangeText={setUtility} title='Utilidad' placeholder='Utilidad' keyboardType="numeric" />
              <TextField value={publicPrice} onChangeText={setPublicPrice} title='Precio público' placeholder='Precio público' keyboardType="numeric" />
              <SearchableSelect
                title='Marca'
                placeholder='Marca'
                options={brandData}
                text={brand.name}
                setText={setBrand}
              />
            </FormGroup>
            { isEditing &&
              <Button
                style={{marginTop: 12}}
                title='Eliminar'
                type='contained'
                textColor='danger'
                onPress={() => deleteProduct()}
              />
            }
          </ScrollView>
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
    marginBottom: 12,
  }
});
