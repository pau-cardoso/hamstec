import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import PageHeader from '../../molecules/PageHeader/PageHeader'
import SearchBar from '../../molecules/SearchBar/SearchBar'

export default function HeaderSearch({title, searchPhrase, setSearchPhrase, style}) {
  return(
    <View style={[styles.container, style]}>
      <PageHeader style={styles.gap} title={title} />
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        onPressFilter={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
  },
  gap: {
    marginBottom: 12,
  },
});

HeaderSearch.propTypes = {
  title: PropTypes.string.isRequired,
  searchPhrase: PropTypes.string,
  setSearchPhrase: PropTypes.func,
};
