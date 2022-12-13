import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Button from './Button';

storiesOf('Button', module)
  .add('Primary', () => (
    <Button onPress={action('clicked-text')} title="Hello Button" />
  ));
