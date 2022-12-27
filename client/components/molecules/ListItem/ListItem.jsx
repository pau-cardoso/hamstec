import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import TextPairing from '../../atoms/TextPairing/TextPairing';
import Card from '../../atoms/Card/Card'

export default function ListItem({ text, secondaryText, image, onPress, onLongPress, style }) {
return(
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <Card>
        <View style={[styles.container, style]}>
          { image &&
            <Image
              style={styles.image}
              source={{ uri: image }}
            />
          }
          <View style={styles.textContainer}>
            <TextPairing
              text={text}
              type='medium'
              size={16} />
            { secondaryText &&
              <TextPairing
                text={secondaryText}
                type='light'
                color='s400'
                size={16} />
            }
          </View>
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
    flexDirection: 'column',
    alignItems: 'start',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 12,
    alignSelf: 'grow',
  },
});

ListItem.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  secondaryText: PropTypes.string,
  image: PropTypes.string,
  onPress: PropTypes.func,
};
