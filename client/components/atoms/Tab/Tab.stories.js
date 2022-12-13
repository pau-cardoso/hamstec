import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Tab from './Tab';

storiesOf('Tab', module)
  .add('Active', () => (
    <Tab title='Presupuesto' isActive={true} />
  ))
  .add('Default', () => (
    <Tab title='Presupuesto' />
  ));
