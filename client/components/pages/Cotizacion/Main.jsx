import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import PageHeader from '../../molecules/PageHeader/PageHeader';
import { TopTabNavigation } from '../../../Navigation';
import { neutral } from '../../config/colors';
import { useState } from 'react';
import { moderateScale } from '../../config/utils';
import { CustomModal, ModalPressable } from '../../../assets/HelperComponents';
import { ConfirmationCodeModal } from '../../organisms/ConfirmationCodeModal';

export default function Main({style, navigation, route}) {
  const [title, setTitle] = useState("");
  const [clientVersion, setClientVersion] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [codeModalVisible, setCodeModalVisible] = useState(false);
  const { projectId } = route.params;
  const {BASE_URL} = process.env;

  useEffect(() => {
    fetch(BASE_URL + "project/" + projectId)
      .then((response) => response.json())
      .then((json) => {
        setTitle(json.name)
        setClientVersion(json.client.name)
      })
      .catch((error) => console.error(error))
    }, []);

  return(
    <View style={[styles.container, style]}>
      <ConfirmationCodeModal setModalVisible={setCodeModalVisible} modalVisible={codeModalVisible} />
      <CustomModal setModalVisible={setModalVisible} modalVisible={modalVisible}>
        <ModalPressable text='Autorizar cotización' iconName='shield-checkmark' onPress={() => { setModalVisible(false); setCodeModalVisible(true);}} />
      </CustomModal>
      <View style={styles.header}>
        <PageHeader
          style={styles.gap}
          title={title}
          secondaryTitle={clientVersion}
          onPressBackButton={() => navigation.goBack()}
          rightButtonIcon='ellipsis-vertical'
          iconSize={32}
          iconColor={neutral.s300}
          onRightButtonClick={() => {setModalVisible(true)}} />
      </View>
      <TopTabNavigation route={route} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flex: 1,
  },
  header: {
    backgroundColor: neutral.white,
    paddingHorizontal: moderateScale(32),
    paddingTop: moderateScale(20),
  },
  gap: {
    marginBottom: moderateScale(12),
  },
});
