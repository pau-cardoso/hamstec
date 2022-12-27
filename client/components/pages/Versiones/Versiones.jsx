import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import PageTemplate from '../../templates/PageTemplate';
import ListItem from '../../molecules/ListItem/ListItem';
import HeaderSearch from '../../organisms/HeaderSearch/HeaderSearch';
import { showMessage } from "react-native-flash-message";
import { showErrorMessage } from '../../config/utils';
import { DeleteModal } from '../../../assets/HelperComponents';


export default function Versiones({style, navigation, route}) {
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [quoteDeleting, setQuoteDeleting] = React.useState({id: null, name: ''});

  const url = "http://localhost:3000/quote/project/" + route.params.id_project;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.error(error);
        showErrorMessage();
      });
    setRefreshing(false);
  }, [refreshing]);

  const addVersion = () => {
    fetch("http://localhost:3000/quote/add/" + route.params.id_project)
      .then((response) => {
        response.json();
        showMessage({
          message: 'Nueva versión creada correctamente',
          type: 'success',
          icon: 'auto'
        });
      })
      .catch((error) => {
        console.error(error);
        showErrorMessage();
      })
      .finally(setRefreshing(true));
  }

  const renderItem = ({ item }) => {
    // when no input, show all
    if ( searchPhrase === "" ||
        item.version.toUpperCase().includes(searchPhrase.toUpperCase().trim()) ) {
      return(
        <View style={styles.item}>
          <ListItem
            text={item.version}
            onPress={() => navigation.navigate('Cotizacion', { quoteId: item.id, projectId: route.params.id_project })}
            onLongPress={() => {setModalVisible(true); setQuoteDeleting({id: item.id, name: item.version});}}
          />
        </View>
      );
    }
  };

  return(
    <View style={[styles.container, style]}>
      <DeleteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        deletedItem={quoteDeleting}
        url={'http://localhost:3000/quote/' + quoteDeleting.id}
        setRefreshing={setRefreshing}
      />
      <PageTemplate
        header={
          <HeaderSearch
            title='Versiones'
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            onPressBackButton={() => navigation.goBack()}
            onRightButtonClick={() => {addVersion()}}
            rightButtonIcon='add-circle' />
        }
        body={
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            refreshing={refreshing}
            onRefresh={() => {setRefreshing(true)}}
          />
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
  }
});

Versiones.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
  bottomNavigation: PropTypes.element,
};
