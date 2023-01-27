import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ModalTemplate from '../../templates/ModalTemplate';
import PageHeader from '../../molecules/PageHeader/PageHeader';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import { showMessage } from 'react-native-flash-message';
import { showErrorMessage } from '../../config/utils';
import TextField from '../../atoms/TextField/TextField';
import Constants from 'expo-constants';

// TODO: Handle empty fields
export default function AgregarSecciones({style, navigation, route}) {
  const [name, setName] = React.useState("");

  const {PROD_API} = Constants.expoConfig.extra;
  const url = `${PROD_API}section/`;
  const isEditing = route.params.sectionId != undefined;

  useEffect(() => {
    if (isEditing) {
      fetch(url + route.params.sectionId)
        .then((response) => response.json())
        .then((json) => {
          setName(json.name);
        })
        .catch((error) => { console.error(error); showErrorMessage(); })
    }
  }, []);

  function addSection() {
    fetch(url + (isEditing? route.params.sectionId : ''), {
      method: isEditing? 'PUT' : 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
      })
    }).then((response) => {
      if (response.status === 200) {
        showMessage({
          message: `Sección ${isEditing? 'editada' : 'creada'} correctamente`,
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
            title='Agregar sección'
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
