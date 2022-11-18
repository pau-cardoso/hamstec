import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import colors from '../../config/colors';
import TextPairing from '../TextPairing/TextPairing';

export default function Button({ onPress, title, children, style }) {
  return(
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.container, styles.text, styles.shadow, style]}>
          {children}
          <TextPairing
            text={title}
            type='medium'
            size={16}
            color='white' />
        </View>
      </TouchableOpacity>
    </View>);
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 55,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.brand,
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
  }
});

Button.defaultProps = {
  title: "Guardar",
  children: null,
  onPress: () => {},
};

Button.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  onPress: PropTypes.func,
};
