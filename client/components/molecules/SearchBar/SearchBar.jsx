import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import TextField from '../../atoms/TextField/TextField';
import IconButton from '../../atoms/IconButton/IconButton'
import { neutral } from '../../config/colors';

export default function SearchBar({searchPhrase, setSearchPhrase, onPressFilter, style}) {
  return(
    <View style={[styles.container, style]}>
      <View style={styles.searchBar}>
        <IconButton
          iconName='search'
          size={15}
          color={neutral.s400}
        />
        <TextField
          placeholder={'Buscar'}
          value={searchPhrase}
          onChangeText={setSearchPhrase} />
      </View>
      { onPressFilter &&
        <IconButton
          style={{ marginLeft: 16 }}
          iconName='filter'
          onPress={onPressFilter}
          size={22}
          color={neutral.s300}
        /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  searchBar: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: neutral.s050,
    paddingHorizontal: 12,
    flex: 1,
    alignItems: 'center',
  }
});

SearchBar.defaultProps = {
  searchPhrase: '',
}

SearchBar.propTypes = {
  searchPhrase: PropTypes.string.isRequired,
  setSearchPhrase: PropTypes.func,
  onPressFilter: PropTypes.func,
};
