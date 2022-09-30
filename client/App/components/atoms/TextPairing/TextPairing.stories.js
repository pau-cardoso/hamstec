import { storiesOf } from '@storybook/react-native';
import React from 'react';
import TextPairing from './TextPairing';

storiesOf('TextPairing', module)
  .add('Header', () => (
    <TextPairing primaryText="Apagador Touch" secondaryText="T30WZ" type='header' />
  ))
  .add('Body', () => (
    <TextPairing primaryText="Apagador Touch" secondaryText="T30WZ" type='body' />
  ));
