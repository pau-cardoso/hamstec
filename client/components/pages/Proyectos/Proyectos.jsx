import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import PageTemplate from '../../templates/PageTemplate';
import ListItem from '../../molecules/ListItem/ListItem';
import HeaderSearch from '../../organisms/HeaderSearch/HeaderSearch';
import { DeleteModal, MenuModal } from '../../../assets/HelperComponents';

export default function Proyectos({style, navigation}) {
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [projectDeleting, setProjectDeleting] = React.useState({id: null, name: ''});

  const url = "http://localhost:3000/project";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
      .then((json) => setData(json))
      .finally(setRefreshing(false));
  }, [refreshing]);

  const renderItem = ({ item }) => {
    if ( searchPhrase === "" ||
        item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim())
        || item.client.name.toUpperCase().includes(searchPhrase.toUpperCase().trim())
        ) {
      return(
        <View style={styles.item}>
          <ListItem
            text={item.name}
            secondaryText={item.client.name}
            onPress={() => navigation.navigate('Versiones', {id_project: item.id})}
            onLongPress={() => {
              setProjectDeleting(item);
              setModalVisible(true);
            }} />
        </View>
      );
    }
  };

  return(
    <View style={[styles.container, style]}>
      <DeleteModal
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        deletedItem={projectDeleting}
        url={'http://localhost:3000/project/' + projectDeleting.id}
        setRefreshing={setRefreshing}
      />
      <MenuModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onDeletePress={() => {setModalVisible(false); setDeleteModalVisible(true)}}
        onEditPress={() => {setModalVisible(false); navigation.navigate('AgregarProyecto');}}
      />
      <PageTemplate
        header={
          <HeaderSearch
            title='Proyectos'
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            rightButtonIcon='add-circle'
            onRightButtonClick={() => navigation.navigate('AgregarProyecto', {setRefreshing: setRefreshing})} />
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
    height: '100%',
  },
  item: {
    marginBottom: 12,
  },
  modalView: {
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 12,
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Proyectos.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
  bottomNavigation: PropTypes.element,
};
