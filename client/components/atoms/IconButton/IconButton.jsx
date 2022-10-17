import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { neutral, primary } from '../../config/colors';
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({ onPress, iconName, size, color, type, style }) {
  const buttonStyle = [styles.container];
  buttonStyle.push(style)
  switch (type) {
    case 'contained':
      buttonStyle.push(styles.containedButton);
      break;
    case 'full':
      console.log('here')
      buttonStyle.push(styles.fullButton);
    default:
      break;
  }

  return(
    <View style={buttonStyle}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={iconName} size={size} color={color} />
      </TouchableOpacity>
    </View>);
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    flexDirection: 'row',
  },
  containedButton: {
    borderRadius: 50,
    padding: 6,
    backgroundColor: primary.s100,
  },
  fullButton: {
    aspectRatio: 'auto',
    width: '100%',
    borderRadius: 10,
    backgroundColor: primary.s100,
  }
});

IconButton.defaultProps = {
  onPress: () => {},
  size: 24,
  color: neutral.s300,
  type: 'default',
};

IconButton.propTypes = {
  onPress: PropTypes.func,
  iconName: PropTypes.string,
  type: PropTypes.oneOf(['default', 'contained', 'full']),
  size: PropTypes.number,
  color: PropTypes.string,
};
