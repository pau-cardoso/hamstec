// import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput } from 'react-native';
import {primary, neutral} from '../../config/colors';
import TextPairing from '../TextPairing/TextPairing';

export default function TextField(props) {
	const [text, onChangeText] = React.useState("");

	return (
		<View style={styles.container}>
			<TextPairing style={styles.spacing} text={props.title} type='medium' size={14} color='s400' />
			<TextInput
				style={styles.input}
				onChangeText={onChangeText}
				value={text}
				placeholderTextColor={neutral.s200}
				{...props}
			/>
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
	marginTop: 4,
  },
});

TextField.propTypes = {
  title: PropTypes.string,
  isActive: PropTypes.bool,
};