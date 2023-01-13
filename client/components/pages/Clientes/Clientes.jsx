import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import PageTemplate from '../../templates/PageTemplate';
import ListItem from '../../molecules/ListItem/ListItem';
import HeaderSearch from '../../organisms/HeaderSearch/HeaderSearch';
import { showErrorMessage } from '../../config/utils';
import { DeleteModal, MenuModal } from '../../../assets/HelperComponents';


export default function Clientes({style, navigation, route}) {
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [clientDeleting, setClientDeleting] = React.useState({id: null, name: ''});

  const {BASE_URL} = process.env;
  const url = `${BASE_URL}client/`;

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

  const renderItem = ({ item }) => {
    // when no input, show all
    if ( searchPhrase === "" ||
        item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim()) ) {
      return(
        <View style={styles.item}>
          <ListItem
            text={item.name}
            onLongPress={() => {
              setClientDeleting({id: item.id, name: item.name});
              setModalVisible(true);
            }}
            // secondaryText={item.email} TODO ask if secondary text is wanted
          />
        </View>
      );
    }
  };

  return(
    <View style={[styles.container, style]}>
      <DeleteModal
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        deletedItem={clientDeleting}
        url={url + clientDeleting.id}
        setRefreshing={setRefreshing}
      />
      <MenuModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onDeletePress={() => { setModalVisible(false); setDeleteModalVisible(true) }}
        onEditPress={() => { setModalVisible(false); navigation.navigate('AgregarCliente', {setRefreshing: setRefreshing, clientId: clientDeleting.id}); }}
      />
      <PageTemplate
        header={
          <HeaderSearch
            title='Clientes'
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            onPressBackButton={() => navigation.goBack()}
            onRightButtonClick={() => {navigation.navigate('AgregarCliente', {setRefreshing: setRefreshing})}}
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
