// import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput } from 'react-native';
import {neutral} from '../../config/colors';
import {fontSize} from '../../config/typography';
import TextPairing from '../TextPairing/TextPairing';
import IconButton from '../IconButton/IconButton';

function onChangeInput(event) {

}

export default function TextField(props) {
	const [quantity, setQuantity] = React.useState("1");
	const [text, setText] = React.useState("");

	const inputStyle = [styles.input];
	if (props.type === 'quantity') {
		inputStyle.push(fontSize.x60);
	}

	return (
		<View style={styles.container}>
			<TextPairing style={styles.spacing} text={props.title} type='medium' size={14} color='s400' />
			<View style={styles.inputContainer}>
				{props.type === 'quantity'?
					<IconButton onPress={() => setQuantity((parseInt(quantity)-1).toString())} iconName='remove' size={32} />
				: null}

				<TextInput
					style={inputStyle}
					onChangeText={props.type === 'quantity'? setQuantity: setText}
					value={props.type === 'quantity'?  quantity: text}
					placeholderTextColor={neutral.s200}
					{...props}
				/>

				{props.type === 'quantity'?
					<IconButton onPress={() => setQuantity((parseInt(quantity)+1).toString())} iconName='add' size={32} />
				: null}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'start',
  },
  input: {
    backgroundColor: neutral.s050,
		padding: 12,
		borderRadius: 8,
	},
	quantityContainer: {
		backgroundColor: neutral.s050,
		padding: 12,
		borderRadius: 8,
	},
	inputContainer: {
		marginTop: 4,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: neutral.s050,
		borderRadius: 8,
		...fontSize.x60
  }
});

TextField.propTypes = {
  title: PropTypes.string,
  isActive: PropTypes.bool,
};