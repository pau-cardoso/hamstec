import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import PageTemplate from '../../templates/PageTemplate';
import ListItem from '../../molecules/ListItem/ListItem';
import HeaderSearch from '../../organisms/HeaderSearch/HeaderSearch';
import { showErrorMessage } from '../../config/utils';
// import { DeleteModal } from '../../../assets/HelperComponents';


export default function Secciones({style, navigation, route}) {
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  // const [modalVisible, setModalVisible] = React.useState(false);
  // const [sectionDeleting, setSectionDeleting] = React.useState({id: null, name: ''});

  const url = "http://localhost:3000/section/";

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
            // onLongPress={() => {setSectionDeleting({id: item.id, name: item.name}); setModalVisible(true);}}
            // secondaryText={item.email} TODO ask if secondary text is wanted
          />
        </View>
      );
    }
  };

  return(
    <View style={[styles.container, style]}>
      {/* <DeleteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        deletedItem={sectionDeleting}
        url={'http://localhost:3000/section/' + sectionDeleting.id}
        setRefreshing={setRefreshing}
      /> */}
      <PageTemplate
        header={
          <HeaderSearch
            title='Secciones'
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            onPressBackButton={() => navigation.goBack()}
            rightButtonIcon='add-circle' />
            // onRightButtonClick={() => {navigation.navigate('AgregarCliente', {setRefreshing: setRefreshing})}}
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
