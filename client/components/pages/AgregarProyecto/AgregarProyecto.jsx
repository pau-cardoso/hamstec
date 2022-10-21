import React from 'react';
import { StyleSheet, View } from 'react-native';
import ModalTemplate from '../../templates/ModalTemplate';
import PageHeader from '../../molecules/PageHeader/PageHeader';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import TextField from '../../atoms/TextField/TextField';

export default function AgregarProyecto({style, navigation}) {
  const [name, setName] = React.useState("");
  const [client, setClient] = React.useState(""); // TODO: How to add client
  const [address, setAddress] = React.useState("");
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
          // TODO: Add onSave method
          <FormGroup onPressSave={() => {}} style={{padding: 0}} >
            <TextField value={name} onChangeText={setName} title='Nombre' placeholder='Nombre' />
            <TextField value={client} onChangeText={setClient} title='Cliente' placeholder='Cliente' />
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
