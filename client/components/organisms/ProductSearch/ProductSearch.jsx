import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView } from 'react-native';
import PageHeader from '../../molecules/PageHeader/PageHeader'
import SearchBar from '../../molecules/SearchBar/SearchBar'
import Chip from '../../atoms/Chip/Chip'

export default function ProductSearch({
  title,
  onPressBackButton,
  searchPhrase,
  setSearchPhrase,
  tabs,
  activeTab,
  setActiveTab,
  onRightButtonClick,
  rightButtonIcon,
  style}) {
  return(
    <View style={[styles.container, style]}>
      <PageHeader
        style={styles.gap}
        title={title}
        onRightButtonClick={onRightButtonClick}
        rightButtonIcon={rightButtonIcon}
        onPressBackButton={onPressBackButton} />
      <SearchBar
        style={styles.gap}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase} />
      <View style={[styles.tabGroup, styles.gap]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          { tabs.map((tab, i) => (
            <Chip
              key={i}
              title={tab}
              style={styles.betweenChips}
              onPress={() => setActiveTab(tab)}
              isActive={ activeTab === tab? true : false } />
          ))}
        </ScrollView>
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

ProductSearch.propTypes = {
  searchPhrase: PropTypes.string,
  setSearchPhrase: PropTypes.func,
  tabs: PropTypes.array,
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
};
