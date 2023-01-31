import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import PageTemplate from '../../templates/PageTemplate';
import ListItem from '../../molecules/ListItem/ListItem';
import HeaderSearch from '../../organisms/HeaderSearch/HeaderSearch';
import { DeleteModal, MenuModal } from '../../../assets/HelperComponents';
import Constants from 'expo-constants';
import { fetchProjects } from '../../../store/actions/ProjectActions';
import { useDispatch, useSelector } from 'react-redux';

export default function Proyectos({style, navigation}) {
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [projectDeleting, setProjectDeleting] = React.useState({id: null, name: ''});

  const {PROD_API} = Constants.expoConfig.extra;
  const url = PROD_API + "project";

  const projects = useSelector((state) => state.projectReducer. projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    setRefreshing(false);
    setData(projects);
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
        url={url + projectDeleting.id}
        setRefreshing={setRefreshing}
      />
      <MenuModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onDeletePress={() => { setModalVisible(false); setDeleteModalVisible(true) }}
        onEditPress={() => { setModalVisible(false); navigation.navigate('AgregarProyecto', {setRefreshing: setRefreshing, projectId: projectDeleting.id}); }}
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
