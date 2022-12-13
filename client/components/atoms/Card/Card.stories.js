import { storiesOf } from '@storybook/react-native';
import { padding } from '../../config/base'
import TextPairing from '../TextPairing/TextPairing';
import { View } from 'react-native';
import React from 'react';
import Card from './Card';

storiesOf('Card', module)
  .addDecorator((story) => <View style={padding}>{story()}</View>)
  .add('Card', () => (
    <Card>
      <TextPairing text="General" type='semibold' size={32} />
	  <TextPairing text="Observaciones" type='medium' size={16} />
	  <TextPairing text="Cerradura C1" type='regular' size={16} />
    </Card>
  ));
