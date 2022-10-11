import { storiesOf } from '@storybook/react-native';
import React from 'react';
import AgregarProducto from './AgregarProducto';

storiesOf('AgregarProducto', module)
  .add('Default', () => (
    <AgregarProducto />
  ));
