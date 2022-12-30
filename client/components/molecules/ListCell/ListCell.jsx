import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import TextPairing from '../../atoms/TextPairing/TextPairing';
import Card from '../../atoms/Card/Card'
import { Ionicons } from '@expo/vector-icons';
import { neutral, primary } from '../../config/colors';

export default function ListCell({ text, iconName, onPress, style }) {
return(
    <TouchableOpacity onPress={onPress} style={style} >
      <Card>
        <View style={styles.container}>
          { iconName &&
            <Ionicons style={{textAlign: 'center', marginRight: 8}} name={iconName} size={25} color={primary.s400} />
          }
          <View style={styles.textContainer}>
            <TextPairing
              text={text}
              type='medium'
              size={16} />
          </View>
          <Ionicons style={{textAlign: 'center'}} name='chevron-forward' size={25} color={neutral.s300} />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 12,
    alignSelf: 'grow',
  },
});

ListCell.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  iconName: PropTypes.string,
  onPress: PropTypes.func,
};
