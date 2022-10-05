import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Colors from '../../config/colors';
import {fontSize, fontWeight, fontColor, monospace} from '../../config/typography';

export default function TextPairing({text, secondaryText, type, size, color}) {
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
	switch (color) {
		case 'white':
			textStyles.push(fontColor.white);
			break
		case 'black':
			textStyles.push(fontColor.black);
			break
		case 'brand':
			textStyles.push(fontColor.brand);
			break
		case 's050':
			textStyles.push(fontColor.s050);
			break
		case 's100':
			textStyles.push(fontColor.s100);
			break
		case 's150':
			textStyles.push(fontColor.s150);
			break
		case 's200':
			textStyles.push(fontColor.s200);
			break
		case 's250':
			textStyles.push(fontColor.s250);
			break
		case 's300':
			textStyles.push(fontColor.s300);
			break
		case 's400':
			textStyles.push(fontColor.s400);
			break
		case 's500':
			textStyles.push(fontColor.s500);
			break
		case 's600':
			textStyles.push(fontColor.s600);
			break
		case 's700':
			textStyles.push(fontColor.s700);
			break
		case 's800':
			textStyles.push(fontColor.s800);
			break
		case 's900':
			textStyles.push(fontColor.s900);
			break
	}

	return (
		<View>
	  <Text style={textStyles}>{text}</Text>
			{secondaryText?
				<Text>{secondaryText}</Text>
				: null
			}
		</View>
	);
}

TextPairing.propTypes = {
  text: PropTypes.string,
  secondaryText: PropTypes.string,
	type: PropTypes.oneOf(['regular', 'medium', 'semibold']),
	size: PropTypes.oneOf([13, 14, 16, 19, 24, 32, 38]),
	color: PropTypes.oneOf(['white', 'black', 'brand', 's050', 's100', 's150', 's200', 's250', 's300', 's400', 's500', 's600', 's700', 's800', 's900']),
};