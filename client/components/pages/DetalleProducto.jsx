import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import PageTemplate from '../templates/PageTemplate';
import PageHeader from '../molecules/PageHeader/PageHeader';
import IconButton from '../atoms/IconButton/IconButton';
import TextPairing from '../atoms/TextPairing/TextPairing';
import Card from '../atoms/Card/Card';
import { moderateScale } from '../config/utils';
import { CustomCenteredModal } from '../../assets/HelperComponents';
import { primary } from '../config/colors';
import { showMessage } from 'react-native-flash-message';

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
  const [favorite, setFavorite] = React.useState(false);
  const [favoriteModalVisible, setFavoriteModalVisible] = React.useState(false);

  const {PROD_API} = process.env;
  const {productId} = route.params;

  useEffect(() => {
    fetch(PROD_API + "product/" + productId)
      .then((response) => response.json())
      .then((json) => {setProduct(json); setFavorite(json.favorite)})
      .catch((error) => console.error(error))
      .finally(setRefreshing(false));
  }, [refreshing]);

  function updateFavoriteProduct() {
    fetch(`${PROD_API}product/${productId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        favorite: !favorite,
      })
    }).then(
      showMessage({
        message: `Producto ${favorite? 'eliminado de' : 'agregado a'} favoritos`,
        type: 'success',
        icon: 'auto'
      })
    ).catch((error) => {
      console.error(error);
      showErrorMessage();
    }).finally(() => {
      setFavoriteModalVisible(false);
      setRefreshing(true);
    });
  }

  return(
    <View style={[styles.container, style]}>
      <CustomCenteredModal
        modalVisible={favoriteModalVisible}
        onConfirmPress={() => {updateFavoriteProduct()}}
        setModalVisible={setFavoriteModalVisible} >
        <TextPairing text={`¿Estás seguro que quieres ${favorite? 'eliminar de' : 'agregar a'} favoritos ${product.name}?`} style={{textAlign: 'center'}} />
      </CustomCenteredModal>
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
                <View style={styles.brandRow}>
                  <TextPairing text={product.brand.name} color='s400' />
                  <View style={styles.iconGroup}>
                    <IconButton
                      iconName={favorite? 'star' : 'star-outline'}
                      color={favorite? primary.brand : undefined}
                      onPress={() => {setFavoriteModalVisible(true)}}
                      size={20}
                      style={{marginRight: 8}} />
                    <IconButton
                      iconName='md-pencil-sharp'
                      onPress={() => navigation.navigate('AgregarProducto', {setRefreshing: setRefreshing, refreshList: route.params.setRefreshing, product: product})}
                      size={20} />
                  </View>
                </View>
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
    alignItems: 'flex-start',
    padding: 24,
    flexWrap: 'wrap',
  },
  image: {
    width: moderateScale(250),
    height: moderateScale(250),
    marginRight: moderateScale(24),
    marginBottom: moderateScale(24),
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
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconGroup: {
    flexDirection: 'row',
  },
});
