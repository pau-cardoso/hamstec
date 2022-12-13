// import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import {primary} from '../../config/colors';
import TextPairing from '../TextPairing/TextPairing';

export default function Tab({title, isActive = false}) {
  const containerStyles = [styles.container];
  if (isActive) {
    containerStyles.push(styles.active);
  }
	return (
		<View style={containerStyles}>
			{isActive ?
			  <TextPairing text={title} type='regular' size={19} color='brand' />
        : <TextPairing text={title} type='regular' size={19} color='s300' />
			}
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  active: {
    backgroundColor: primary.s100,
  }
});

Tab.propTypes = {
  title: PropTypes.string,
  isActive: PropTypes.bool,
};