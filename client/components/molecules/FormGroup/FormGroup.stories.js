import { storiesOf } from '@storybook/react-native';
import { center } from '../../config/base'
import React from 'react';
import TextField from '../../atoms/TextField/TextField';
import { View } from 'react-native';
import FormGroup from './FormGroup';

function Padre() {
  const [quantity, setQuantity] = React.useState("1");
  const [text, setText] = React.useState("");

  return (
    <FormGroup>
      <TextField value={text} onChangeText={setText} title='Zona' placeholder='Zona' />
      <TextField value={text} onChangeText={setText} title='Area' placeholder='Area' />
      <TextField value={text} onChangeText={setText} title='Observaciones' placeholder='Observaciones' />
      <TextField value={text} onChangeText={setText} title='Notas' placeholder='Notas' />
      <TextField value={quantity} onChangeText={setQuantity} title='Cantidad' placeholder='Cantidad' type='quantity' keyboardType="numeric" />
    </FormGroup>
	);
}

storiesOf('FormGroup', module)
  .addDecorator((story) => <View style={center}>{story()}</View>)
  .add('Default', () => (
    <Padre />
  ))
;
