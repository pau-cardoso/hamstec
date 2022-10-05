import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { neutral } from '../../config/colors';

export default function Card({ children }) {
  return(
    <View style={styles.container}>
      { children }
    </View>);
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: neutral.white,
    borderRadius: 15,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
  },
});

Card.defaultProps = {
  children: null,
};

Card.propTypes = {
  children: PropTypes.node,
};
