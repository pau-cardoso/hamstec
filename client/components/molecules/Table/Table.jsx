import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

export default function Table({ children, style }) {
  return(
    <View style={[styles.container, style]}>
      { children }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
});

Table.propTypes = {
  children: PropTypes.node.isRequired,
};
