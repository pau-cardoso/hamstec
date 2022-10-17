import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import TextPairing from '../../atoms/TextPairing/TextPairing';

export default function Cell({ value, header, flex, style }) {
  return(
    <View style={[styles.container, style, {flex: flex}]}>
      <TextPairing text={value} type={header? 'medium' : 'regular'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginRight: 24,
    width: '100%',
  },
});

Cell.defaultProps = {
  header: false,
  flex: 1,
};

Cell.propTypes = {
  value: PropTypes.string.isRequired,
  header: PropTypes.bool,
  flex: PropTypes.number,
};
