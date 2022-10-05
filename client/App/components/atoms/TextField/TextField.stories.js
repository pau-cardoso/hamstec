import { storiesOf } from '@storybook/react-native';
import React from 'react';
import TextField from './TextField';

storiesOf('InputField', module)
  .add('Text', () => (
    <TextField title='Zona' placeholder='Zona' />
  ))
  .add('Multiline', () => (
    <TextField title='Observaciones' placeholder='Observaciones' multiline numberOfLines={4} />
  ))
  .add('Quantity', () => (
    <TextField title='Cantidad' placeholder='Cantidad' type='quantity' keyboardType="numeric" />
  ))
;
