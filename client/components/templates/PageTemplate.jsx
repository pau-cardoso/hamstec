import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { neutral } from '../config/colors';
import { moderateScale, scale } from '../config/utils';

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
    backgroundColor: neutral.s050,
    height: '100%',
  },
  header: {
    backgroundColor: neutral.white,
    paddingHorizontal: scale(32),
    paddingVertical: moderateScale(20),
  },
  body: {
    flex: 1,
    paddingHorizontal: scale(32),
    paddingTop: moderateScale(22),
  }
});

PageTemplate.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
  bottomNavigation: PropTypes.element,
};
