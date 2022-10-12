import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image } from 'react-native';
import TextPairing from '../../atoms/TextPairing/TextPairing';
import Card from '../../atoms/Card/Card'

export default function ListItem({ text, secondaryText, image, style }) {
  return(
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
  text: PropTypes.string.isRequired,
  secondaryText: PropTypes.string,
  image: PropTypes.string,
};
