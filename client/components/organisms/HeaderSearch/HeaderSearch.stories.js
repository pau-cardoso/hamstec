import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import HeaderSearch from './HeaderSearch';

function Padre() {
  const [searchPhrase, setSearchPhrase] = React.useState("");

  return (
    <SafeAreaView>
      <HeaderSearch
        title='Proyectos'
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase} />
    </SafeAreaView>
  );
}

storiesOf('HeaderSearch', module)
  .add('Default', () => (
    <Padre />
  ));
