import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ModalTemplate from '../templates/ModalTemplate';
import PageHeader from '../molecules/PageHeader/PageHeader';
import FormGroup from '../molecules/FormGroup/FormGroup';
import SearchableSelect from '../molecules/SearchableSelect/SearchableSelect';

export default function AgregarProyecto({style, navigation, route}) {
  const [name, setName] = React.useState("");
  const [section, setSection] = React.useState({id:0, name: ""});
  const [address, setAddress] = React.useState("");
  const [sectionData, setSectionData] = React.useState();

  useEffect(() => {
    fetch('http://localhost:3000/section')
      .then((response) => response.json())
      .then((json) => setSectionData(json))
      .catch((error) => console.error(error))
  }, []);

  function addSection() {
    fetch('http://localhost:3000/quote-product', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quote: route.params.idQuote,
        section: section.id,
        phase: "COTIZACION",
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
            <SearchableSelect
              title='Sección'
              placeholder='Sección'
              options={sectionData}
              text={section.name}
              setText={setSection}
            />
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
