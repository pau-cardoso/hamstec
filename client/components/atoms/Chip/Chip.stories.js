import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Chip from './Chip';

storiesOf('Chip', module)
  .add('Default', () => (
    <Chip title='Todo' />
  ))
  .add('Active', () => (
    <Chip title='ORVIBO' isActive={true} />
  ));
