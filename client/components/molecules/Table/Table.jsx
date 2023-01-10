import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function Table({ children, style }) {
  return(
    <ScrollView horizontal contentContainerStyle={{width: '100%'}}>
      <View style={[styles.container, style]}>
        { children }
      </View>
    </ScrollView>
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
