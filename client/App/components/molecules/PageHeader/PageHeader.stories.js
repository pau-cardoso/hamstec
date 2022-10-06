import { storiesOf } from '@storybook/react-native';
import { padding } from '../../config/base'
import { View } from 'react-native';
import React from 'react';
import PageHeader from './PageHeader';

storiesOf('PageHeader', module)
//   .addDecorator((story) => <View style={padding}>{story()}</View>)
  .add('Default', () => (
	  <PageHeader title='Laja 52' />
	))
	.add('With back button', () => (
		<PageHeader title='Agregar producto' hasBackButton={true} />
	))
	.add('With right button', () => (
		<PageHeader title='Tareas' hasBackButton={true} hasRightButton={true} />
	))
;
