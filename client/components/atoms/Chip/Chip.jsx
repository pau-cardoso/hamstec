// import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { neutral, primary } from '../../config/colors';
import TextPairing from '../TextPairing/TextPairing';

export default function Chip({title, onPress, isActive, style}) {
  const containerStyles = [styles.container];
  if (isActive) {
    containerStyles.push(styles.active);
  }
	return (
    <TouchableOpacity onPress={onPress} style={style}>
		  <View style={containerStyles}>
        {isActive ?
          <TextPairing text={title} type='regular' size={16} color='white' />
          : <TextPairing text={title} type='regular' size={16} color='s400' />
        }
		  </View>
    </TouchableOpacity>
	);
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 4,
	  backgroundColor: neutral.s100,
  },
  active: {
    backgroundColor: primary.brand,
  }
});

Chip.defaultProps = {
  onPress: () => {},
  isActive: false,
};

Chip.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  isActive: PropTypes.bool,
};