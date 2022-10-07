import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { neutral, primary } from '../../config/colors';
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({ onPress, iconName, size, color, type, style }) {
  const buttonStyle = [styles.container];
  buttonStyle.push(style)
  if (type === 'contained') {
    buttonStyle.push(styles.containedButton);
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
  },
  containedButton: {
    borderRadius: 50,
    padding: 6,
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
  type: PropTypes.oneOf(['default', 'contained']),
  size: PropTypes.number,
  color: PropTypes.string,
};
