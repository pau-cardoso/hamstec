// import { Text, View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import TextField from '../../atoms/TextField/TextField';
import ListItem from '../ListItem/ListItem';
import { removeAccents } from '../../config/utils';

export default function SearchableSelect({title, placeholder, options, text, setText}) {
  const [showOptions, setShowOptions] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  const renderItem = ({ item }) => {
    const itemName = removeAccents(item.name);
    const textSearch = removeAccents(searchPhrase);
    // when no input, show all
    if ( textSearch === "" ||
        itemName.toUpperCase().includes(textSearch.toUpperCase().trim())
        ) {
      return(
        <View>
          <ListItem
            text={item.name}
            onPress={() => {
              setShowOptions(false);
              setText(item);
              setSearchPhrase(item.name);
            }} />
        </View>
      );
    }
  };

	return (
		<View style={styles.container}>
      <View>
          <TextField
            onChangeText={setSearchPhrase}
            onFocus={() => setShowOptions(true)}
            placeholder={placeholder}
            title={title}
            value={searchPhrase} />
      </View>
      <View>
        {/* Options wrapper */}
        {showOptions && (
          <FlatList
            data={options}
            extraData={options}
            renderItem={renderItem}
            initialNumToRender={5}
            maxToRenderPerBatch={20}
            windowSize={10}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </View>
	);
}

const styles = StyleSheet.create({
  container: {
  },
});
