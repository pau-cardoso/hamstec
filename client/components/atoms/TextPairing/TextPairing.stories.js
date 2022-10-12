import { storiesOf } from '@storybook/react-native';
import React from 'react';
import TextPairing from './TextPairing';


storiesOf('TextPairing', module)
  .add('Header', () => (
    <TextPairing text="Agregar producto" type='semibold' size={38} />
  ))
  .add('Subheading', () => (
    <TextPairing text="Planta baja" type='semibold' size={32} />
  ))
  .add('Body', () => (
    <TextPairing text="Entrada" type='regular' size={16} />
  ));