import { storiesOf } from '@storybook/react-native';
import { center } from '../../config/base'
import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import SearchBar from './SearchBar';

function Padre(props) {
  const [searchPhrase, setSearchPhrase] = React.useState("");

  return (
    <SafeAreaView>
      <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} {...props} />
    </SafeAreaView>
    );
  }

storiesOf('SearchBar', module)
  .addDecorator((story) => <View style={center}>{story()}</View>)
  .add('Default', () => (
    <Padre />
  ))
  .add('With filters', () => (
    <Padre onPressFilter={() => {}} />
  ))
;
