import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ModalTemplate from '../../templates/ModalTemplate';
import PageHeader from '../../molecules/PageHeader/PageHeader';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import TextField from '../../atoms/TextField/TextField';
import SearchableSelect from '../../molecules/SearchableSelect/SearchableSelect';
import { showMessage } from 'react-native-flash-message';
import { showErrorMessage, showWarningMessage } from '../../config/utils';

export default function AgregarProyecto({style, navigation, route}) {
  const [name, setName] = React.useState("");
  const [client, setClient] = React.useState({id:0, name: ""});
  const [address, setAddress] = React.useState("");
  const [clientData, setClientData] = React.useState();

  useEffect(() => {
    fetch('http://localhost:3000/client')
      .then((response) => response.json())
      .then((json) => setClientData(json))
      .catch((error) => {
        console.error(error);
        showErrorMessage();
      })
  }, []);

  function addProject() {
    if (client.id === 0) {
      showWarningMessage("Cliente no puede estar vacío");
    } else if (name.trim() === "") {
      showWarningMessage("Nombre no puede estar vacío");
    } else {
      fetch('http://localhost:3000/project', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          address: address.trim(),
          client: client.id,
        })
      }).then((response) => {
        if (response.status === 200) {
          showMessage({
            message: 'Proyecto creado correctamente',
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
  }

  return(
    <View style={[styles.container, style]}>
      <ModalTemplate
        header={
          <PageHeader
            title='Agregar proyecto'
            rightButtonIcon='ios-close'
            onRightButtonClick={() => navigation.goBack()}
          />
        }
        body={
          <FormGroup onPressSave={() => addProject()} style={{padding: 0}} >
            <TextField value={name} onChangeText={setName} title='Nombre' placeholder='Nombre' />
            <SearchableSelect
              title='Cliente'
              placeholder='Cliente'
              options={clientData}
              text={client.name}
              setText={setClient}
            />
            <TextField value={address} onChangeText={setAddress} title='Dirección' placeholder='Dirección' multiline />
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
