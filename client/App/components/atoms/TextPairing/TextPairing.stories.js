import { storiesOf } from '@storybook/react-native';
import React from 'react';
import TextPairing from './TextPairing';


storiesOf('TextPairing', module)
  .add('Header', () => (
    <TextPairing primaryText="Agregar producto" type='semibold' size={38} />
  ))
  .add('Subheading', () => (
    <TextPairing primaryText="Planta baja" type='semibold' size={32} />
  ))
  .add('Body', () => (
    <TextPairing primaryText="Entrada" type='regular' size={16} />
  ));