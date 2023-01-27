import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ModalTemplate from '../templates/ModalTemplate';
import PageHeader from '../molecules/PageHeader/PageHeader';
import FormGroup from '../molecules/FormGroup/FormGroup';
import TextField from '../atoms/TextField/TextField';
import { showErrorMessage } from '../config/utils';
import Constants from 'expo-constants';

export default function ModificarViaticos({style, navigation, route}) {
  const [expenses, setExpenses] = React.useState(0);

  const {PROD_API} = Constants.expoConfig.extra;
  const {quoteId} = route.params;
  const url = `${PROD_API}quote/`

  useEffect(() => {
    fetch(url + quoteId)
      .then((response) => response.json())
      .then((json) => {
        setExpenses(json.expenses);
      })
      .catch((error) => {console.error(error); showErrorMessage();})
  }, []);

  function editExpenses() {
    fetch(url + quoteId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        expenses: expenses,
      })
    }).catch((error) => {
      console.error(error);
      showErrorMessage();
    }).finally(
      navigation.goBack(), route.params.setRefreshing(true)
    )
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
          <FormGroup onPressSave={() => editExpenses()} style={{padding: 0}} >
            <TextField value={expenses} onChangeText={setExpenses} title='Viáticos' placeholder='Viáticos' />
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
