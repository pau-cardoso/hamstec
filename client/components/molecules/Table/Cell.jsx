import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import TextPairing from '../../atoms/TextPairing/TextPairing';

export default function Cell({ value, header, flex, width, children, style }) {
  return(
    <View style={[styles.container, style, {flex: flex, width: width}]}>
      { children }
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.bool,
  flex: PropTypes.number,
};
