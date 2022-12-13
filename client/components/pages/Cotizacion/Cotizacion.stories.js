import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Cotizacion from './Cotizacion';

storiesOf('Cotizacion', module)
  .add('Default', () => (
    <Cotizacion />
  ));
