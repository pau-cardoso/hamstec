import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { neutral } from '../config/colors';
import { moderateScale } from '../config/utils';

export default function ModalTemplate({header, body, style}) {
  return(
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        { header }
      </View>
      <View style={styles.body}>
        { body }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: neutral.white,
    paddingHorizontal: moderateScale(32),
    paddingVertical: moderateScale(20),
    flex: 1,
  },
  header: {
    marginBottom: 12,
  },
  body: {
    flex: 1,
  }
});

ModalTemplate.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
};
