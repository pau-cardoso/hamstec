import { storiesOf } from '@storybook/react-native';
import { padding } from '../../config/base'
import { View } from 'react-native';
import React from 'react';
import ListItem from './ListItem';

storiesOf('ListItem', module)
  .addDecorator((story) => <View style={padding}>{story()}</View>)
  .add('Primary text', () => (
	  <ListItem text='Laja 52' />
	))
	.add('Secondary text', () => (
		<ListItem text='Laja 52' secondaryText='Diego Orozco Pérez' />
	))
  .add('Image', () => (
    <ListItem text='Laja 52' secondaryText='Diego Orozco Pérez' image='https://reactnative.dev/img/tiny_logo.png' />
  ))
;
