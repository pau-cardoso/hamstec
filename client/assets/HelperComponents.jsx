import { Modal, Pressable, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Button from "../components/atoms/Button/Button";
import Card from "../components/atoms/Card/Card";
import TextPairing from "../components/atoms/TextPairing/TextPairing";
import { neutral, others } from "../components/config/colors";
import { moderateScale, showErrorMessage } from "../components/config/utils";

export const DeleteModal = ({setModalVisible, modalVisible, deletedItem, url, setRefreshing, onDeletePress, secondaryMessage }) => {
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
            { secondaryMessage && <TextPairing text={secondaryMessage} type='light' /> }
            <View style={styles.modalButtons}>
              <Button
                type='contained'
                title='Cancelar'
                textColor='s400'
                style={{backgroundColor: neutral.s100, marginRight: 12}}
                onPress={() => setModalVisible(false)}
              />
              <Button type='contained'
                title='Eliminar'
                textColor='danger'
                iconName='trash-outline'
                iconColor={others.danger}
                onPress={onDeletePress? onDeletePress : () => deleteItem()}
              />
            </View>
          </View>
        </Card>
      </View>
    </Modal>
  )
};

export const MenuModal = ({setModalVisible, modalVisible, onDeletePress, onEditPress}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPressOut={() => {setModalVisible(false)}} >
        <View style={styles.menuModalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.menuModalStyle}>
              <Pressable style={({pressed}) => pressableStyle({pressed})} onPress={onEditPress} >
                  <Ionicons style={styles.iconButton} name='pencil' size={moderateScale(20, 0.25)} color={neutral.s300} />
                  <TextPairing text='Editar' />
              </Pressable>
              <Pressable style={({pressed}) => pressableStyle({pressed})} onPress={onDeletePress} >
                  <Ionicons style={styles.iconButton} name='trash' size={moderateScale(20, 0.25)} color={neutral.s300} />
                  <TextPairing text='Eliminar' />
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export const CustomModal = ({setModalVisible, modalVisible, children}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPressOut={() => {setModalVisible(false)}} >
        <View style={styles.menuModalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.menuModalStyle}>
              { children }
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export const ModalPressable = ({onPress, text, iconName, iconColor = neutral.s300}) => {
  return (
    <Pressable style={({pressed}) => pressableStyle({pressed})} onPress={onPress} >
      <Ionicons style={styles.iconButton} name={iconName} size={moderateScale(20, 0.25)} color={iconColor} />
      <TextPairing text={text} />
    </Pressable>
  )
}

const pressableStyle = ({pressed}) => ([
  { backgroundColor: pressed? neutral.s100 : null },
  styles.optionContainer,
]);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  modalView: {
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 12,
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  menuModalStyle: {
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 20,
    borderRadius: 16,
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  optionContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 8,
  },
  iconButton: {
    marginRight: moderateScale(8),
    textAlign: 'center',
  },
});