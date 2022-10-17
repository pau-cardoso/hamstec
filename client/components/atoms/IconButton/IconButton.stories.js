import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { primary } from '../../config/colors';
import IconButton from './IconButton';

storiesOf('IconButton', module)
  .add('Default', () => (
    <IconButton onPress={action('clicked-text')} iconName='add' size={32} />
  ))
  .add('Contained', () => (
    <IconButton onPress={action('clicked-text')} iconName='add' type='contained' color={primary.brand}  size={32} />
  ))
  .add('Full', () => (
    <IconButton onPress={action('clicked-text')} iconName='add' type='full' color={primary.brand}  size={32} />
  ))
;
