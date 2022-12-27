import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import PageTemplate from '../templates/PageTemplate';
import PageHeader from '../molecules/PageHeader/PageHeader';
import IconButton from '../atoms/IconButton/IconButton';
import TextPairing from '../atoms/TextPairing/TextPairing';
import Card from '../atoms/Card/Card';

export default function DetalleProducto({route, navigation, style}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [product, setProduct] = React.useState({
    id: 0,
    name: "",
    code: "",
    image: "",
    description: "",
    price: "",
    installation: "",
    utility: "",
    public_price: "",
    brand: {
      id: 0,
      name: ""
    }
  });

  const {productId} = route.params;

  useEffect(() => {
    fetch("http://localhost:3000/product/" + productId)
      .then((response) => response.json())
      .then((json) => setProduct(json))
      .catch((error) => console.error(error))
      .finally(setRefreshing(false));
  }, [refreshing]);

  return(
    <View style={[styles.container, style]}>
      <PageTemplate
        header={
          <PageHeader title={product.name} onPressBackButton={() => {navigation.goBack(); route.params.setRefreshing(true);}} />
        }
        body={
          <Card>
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={{ uri: product.image }}
              />
              <View style={styles.details}>
                <TextPairing text={product.brand.name} color='s400' />
                <TextPairing text={product.name} size={32} />
                <TextPairing text={product.description} />
                <View style={styles.specifications}>
                  <View style={styles.rowText}>
                    <TextPairing style={styles.textHeader} text='Código:' type='semibold' />
                    <TextPairing text={product.code} />
                  </View>
                  <View style={styles.rowText}>
                    <TextPairing style={styles.textHeader} text='Costo:' type='semibold' />
                    <TextPairing text={product.price} />
                  </View>
                  <View style={styles.rowText}>
                    <TextPairing style={styles.textHeader} text='Instalación:' type='semibold' />
                    <TextPairing text={product.installation} />
                  </View>
                  <View style={styles.rowText}>
                    <TextPairing style={styles.textHeader} text='Precio público:' type='semibold' />
                    <TextPairing text={product.public_price} />
                  </View>
                  <View style={styles.rowText}>
                    <TextPairing style={styles.textHeader} text='Utilidad:' type='semibold' />
                    <TextPairing text={product.utility} />
                  </View>
                </View>
              </View>
              <IconButton
                iconName='md-pencil-sharp'
                onPress={() => navigation.navigate('AgregarProducto', {setRefreshing: setRefreshing, refreshList: route.params.setRefreshing, product: product})}
                size={20} />
            </View>
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
  },
  item: {
    marginBottom: 12,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    padding: 24,
  },
  image: {
    width: 250,
    height: 250,
    marginRight: 24,
    alignSelf: 'grow',
  },
  details: {
    flexGrow: 1,
  },
  specifications: {
    marginTop: 16,
  },
  textHeader: {
    width: 160,
  },
  rowText: {
    flexDirection: 'row',
  }
});
