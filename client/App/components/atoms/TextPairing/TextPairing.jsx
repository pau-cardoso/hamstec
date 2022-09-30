import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Colors from '../../config/colors';
import {fontSize, fontWeight, monospace} from '../../config/typography';

export default TextPairing = ({primaryText, secondaryText, type, size}) => {
	const textStyles = [monospace.base];
	switch (type) {
		case 'medium':
			textStyles.push(fontWeight.medium);
			break;

		case 'semibold':
			textStyles.push(fontWeight.semibold);
			break;

		default:
			textStyles.push(fontWeight.regular);
			break;
	}
	switch (size) {
		case 13:
			textStyles.push(fontSize.x10);
			break;

		case 14:
			textStyles.push(fontSize.x20);
			break;

		case 16:
			textStyles.push(fontSize.x30);
			break;

		case 19:
			textStyles.push(fontSize.x40);
			break;

		case 24:
			textStyles.push(fontSize.x50);
			break;

		case 32:
			textStyles.push(fontSize.x60);
			break;

		case 38:
			textStyles.push(fontSize.x70);
			break;

			default:
			textStyles.push(fontSize.x30);
			break;
	}
	return (
		<View>
      <Text style={textStyles}>{primaryText}</Text>
			{secondaryText?
				<Text>{secondaryText}</Text>
				: null
			}
		</View>
	);
}

TextPairing.propTypes = {
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
	type: PropTypes.oneOf(['regular', 'medium', 'semibold']),
	size: PropTypes.oneOf([13, 14, 16, 19, 24, 32, 38]),
};