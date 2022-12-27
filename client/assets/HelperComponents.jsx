import { Modal, StyleSheet, View } from "react-native";
import Button from "../components/atoms/Button/Button";
import Card from "../components/atoms/Card/Card";
import TextPairing from "../components/atoms/TextPairing/TextPairing";
import { neutral, others } from "../components/config/colors";
import { showErrorMessage } from "../components/config/utils";


export const DeleteModal = ({setModalVisible, modalVisible, deletedItem, url, setRefreshing}) => {
  function deleteItem() {
    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    }).catch((error) => {
      console.error(error);
      showErrorMessage();
    }).finally(() => {
      setModalVisible(false);
      setRefreshing(true);
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.modalContainer}>
        <Card style={styles.modalView}>
          <View style={styles.modalView}>
            <TextPairing text='¿Estás seguro que quieres eliminar' />
            <TextPairing text={deletedItem.name + '?'} type='medium' />
            <View style={styles.modalButtons}>
              <Button
                type='contained'
                title='Cancelar'
                textColor='s400'
                style={{backgroundColor: neutral.s100}}
                onPress={() => setModalVisible(false)}
              />
              <Button type='contained'
                title='Eliminar'
                textColor='danger'
                iconName='trash-outline'
                iconColor={others.danger}
                onPress={() => deleteItem()}
              />
            </View>
          </View>
        </Card>
      </View>
    </Modal>
  )
};


const styles = StyleSheet.create({
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