import React from 'react';
import { StyleSheet, View } from 'react-native';
import ModalTemplate from '../../templates/ModalTemplate';
import PageHeader from '../../molecules/PageHeader/PageHeader';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import { showMessage } from 'react-native-flash-message';
import { showErrorMessage } from '../../config/utils';
import TextField from '../../atoms/TextField/TextField';

// TODO: Handle empty fields
export default function AgregarMarca({style, navigation, route}) {
  const [name, setName] = React.useState("");

  function addSection() {
    fetch('http://localhost:3000/brand', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
      })
    }).then(showMessage({
        message: 'Marca creada correctamente',
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

  return(
    <View style={[styles.container, style]}>
      <ModalTemplate
        header={
          <PageHeader
            title='Agregar marca'
            rightButtonIcon='ios-close'
            onRightButtonClick={() => navigation.goBack()}
          />
        }
        body={
          <FormGroup onPressSave={() => addSection()} style={{padding: 0}} >
            <TextField value={name} onChangeText={setName} title='Nombre' placeholder='Nombre' />
          </FormGroup>
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
  },
});
