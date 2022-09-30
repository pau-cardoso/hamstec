import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import Button from './Button';

storiesOf('Button', module)
  .add('Primary', () => (
    <Button onPress={action('clicked-text')}>
      Hello Button
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      😀 😎 👍 💯
    </Button>
  ));
