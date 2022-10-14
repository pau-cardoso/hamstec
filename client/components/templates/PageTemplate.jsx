import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { neutral } from '../config/colors';

export default function PageTemplate({header, body, bottomNavigation, style}) {
  return(
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        { header }
      </View>
      <View style={styles.body}>
        { body }
      </View>
      <View>
        { bottomNavigation }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
  },
  header: {
    backgroundColor: neutral.white,
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  body: {
    paddingHorizontal: 32,
    paddingTop: 22,
  }
});

PageTemplate.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
  bottomNavigation: PropTypes.element,
};
