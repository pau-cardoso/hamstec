import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PageHeader from '../../molecules/PageHeader/PageHeader'
import SearchBar from '../../molecules/SearchBar/SearchBar'
import Chip from '../../atoms/Chip/Chip'

export default function ProductSearch({searchPhrase, setSearchPhrase, tabs, activeTab, setActiveTab, style}) {
  return(
    <View style={[styles.container, style]}>
      <PageHeader style={styles.gap} title='Agregar producto' hasBackButton={true} />
      <SearchBar
        style={styles.gap}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase} />
      <View style={[styles.tabGroup, styles.gap]}>
        { tabs.map((tab, i) => (
          <Chip
            key={i}
            title={tab}
            style={styles.betweenChips}
            onPress={() => setActiveTab(tab)}
            isActive={ activeTab === tab? true : false } />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
  },
  tabGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gap: {
    marginBottom: 12,
  },
  betweenChips: {
    marginRight: 8,
  }
});

SearchBar.propTypes = {
  searchPhrase: PropTypes.string,
  setSearchPhrase: PropTypes.func,
  tabs: PropTypes.array,
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
};
