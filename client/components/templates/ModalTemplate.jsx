import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { neutral } from '../config/colors';

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
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 12,
  },
  body: {}
});

ModalTemplate.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
};
