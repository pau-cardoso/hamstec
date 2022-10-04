import { storiesOf } from '@storybook/react-native';
import React from 'react';
import TextField from './TextField';

storiesOf('TextField', module)
  .add('Text input', () => (
    <TextField title='Zona' placeholder='Zona' />
  ))
  .add('Numeric input', () => (
    <TextField title='Cantidad' keyboardType="numeric" />
  ))
;
