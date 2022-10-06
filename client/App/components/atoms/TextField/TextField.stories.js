import { storiesOf } from '@storybook/react-native';
import React from 'react';
import TextField from './TextField';
import { View } from 'react-native';

function Padre(props) {
  const [quantity, setQuantity] = React.useState("1");
  const [text, setText] = React.useState("");

  return (
    <View>
      { props.type === 'quantity'?
        <TextField value={quantity} onChangeText={setQuantity} {...props} />
        : <TextField value={text} onChangeText={setText} {...props} />
      }
    </View>
	);
}

storiesOf('InputField', module)
  .add('Text', () => (
    <Padre title='Zona' placeholder='Zona' />
  ))
  .add('Multiline', () => (
    <Padre title='Observaciones' placeholder='Observaciones' multiline numberOfLines={4} />
  ))
  .add('Quantity', () => (
    <Padre title='Cantidad' placeholder='Cantidad' type='quantity' keyboardType="numeric" />
  ))
;
