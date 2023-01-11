import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ModalTemplate from '../../templates/ModalTemplate';
import PageHeader from '../../molecules/PageHeader/PageHeader';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import { showMessage } from 'react-native-flash-message';
import { showErrorMessage } from '../../config/utils';
import TextField from '../../atoms/TextField/TextField';

// TODO: Handle empty fields
export default function AgregarCliente({style, navigation, route}) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");

  const isEditing = route.params.clientId != undefined;

  useEffect(() => {
    if (isEditing) {
      fetch('http://localhost:3000/client/' + route.params.clientId)
        .then((response) => response.json())
        .then((json) => {
          setName(json.name);
          setPhone(json.phone);
          setEmail(json.email);
        })
        .catch((error) => { console.error(error); showErrorMessage(); })
    }
  }, []);

  function addClient() {
    fetch(`http://localhost:3000/client/${isEditing? route.params.clientId : ''}`, {
      method: isEditing? 'PUT' : 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
      })
    }).then((response) => {
      if (response.status === 200) {
        showMessage({
          message: `Cliente ${isEditing? 'editado' : 'creado'} correctamente`,
          type: 'success',
          icon: 'auto'
        });
      }
    }).catch((error) => {
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
            title='Agregar cliente'
            rightButtonIcon='ios-close'
            onRightButtonClick={() => navigation.goBack()}
          />
        }
        body={
          <FormGroup onPressSave={() => addClient()} style={{padding: 0}} >
            <TextField value={name} onChangeText={setName} title='Nombre' placeholder='Nombre' />
            <TextField value={phone} onChangeText={setPhone} title='Teléfono' placeholder='Teléfono' />
            <TextField value={email} onChangeText={setEmail} title='Correo' placeholder='Correo' />
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
