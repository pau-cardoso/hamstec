import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import ProductSearch from './ProductSearch';

function Padre() {
  const TABS = ['Todos', 'Broadlink', 'ORVIBO', 'Amazon']
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("Todos");

  return (
    <SafeAreaView>
      <ProductSearch
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        tabs={TABS}
        activeTab={activeTab}
        setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
}

storiesOf('ProductSearch', module)
  .add('Default', () => (
    <Padre />
  ));
