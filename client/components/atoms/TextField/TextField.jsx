import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import {neutral} from '../../config/colors';
import {fontSize} from '../../config/typography';
import TextPairing from '../TextPairing/TextPairing';
import IconButton from '../IconButton/IconButton';
import { moderateScale } from '../../config/utils';

export default function TextField(props) {
	const inputStyle = [styles.input];
	if (props.type === 'quantity') {
		inputStyle.push(fontSize.x60);
	}

	return (
		<View style={styles.container}>
			{ props.title && <TextPairing style={styles.spacing} text={props.title} type='medium' size={14} color='s400' /> }
			<View style={styles.inputContainer}>
				{props.type === 'quantity'?
					<IconButton onPress={() => props.onChangeText((parseInt(props.value)-1).toString())} iconName='remove' size={32} />
				: null}

				<TextInput
					style={inputStyle}
					placeholderTextColor={neutral.s200}
					{...props}
				/>

				{props.type === 'quantity'?
					<IconButton onPress={() => props.onChangeText((parseInt(props.value)+1).toString())} iconName='add' size={32} />
				: null}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
		width: '100%',
  },
  spacing: {
	  marginBottom: 4,
  },
  input: {
    backgroundColor: neutral.s050,
		padding: moderateScale(12),
		borderRadius: 8,
		flex: 1,
		...fontSize.x30
	},
	quantityContainer: {
		width: '100%',
		backgroundColor: neutral.s050,
		padding: 12,
		borderRadius: 8,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		alignContent: 'stretch',
		justifyContent: 'flex-start',
		backgroundColor: neutral.s050,
		borderRadius: 8,
		...fontSize.x60,
		width: '100%',
  }

});
