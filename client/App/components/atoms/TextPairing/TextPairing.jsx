import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
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
		case 'x10':
			textStyles.push(fontSize.x10);
			break;

		case 'x20':
			textStyles.push(fontSize.x20);
			break;

		case 'x30':
			textStyles.push(fontSize.x30);
			break;

		case 'x40':
			textStyles.push(fontSize.x40);
			break;

		case 'x50':
			textStyles.push(fontSize.x50);
			break;

		case 'x60':
			textStyles.push(fontSize.x60);
			break;

			default:
			textStyles.push(fontSize.x70);
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