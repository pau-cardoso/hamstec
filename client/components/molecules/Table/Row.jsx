import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

export default function Row({ children, style }) {
  return(
    <View style={[styles.container, style]}>
      { children }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 8,
  },
});

Row.propTypes = {
  children: PropTypes.node,
};
