import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { neutral, primary } from '../../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from '../../config/utils';

export default function IconButton({ onPress, iconName, size, color, type, style }) {
  const buttonStyle = [styles.container];
  buttonStyle.push(style)
  switch (type) {
    case 'contained':
      buttonStyle.push(styles.containedButton);
      break;
    case 'full':
      buttonStyle.push(styles.fullButton);
    default:
      break;
  }

  return(
    <TouchableOpacity onPress={onPress} style={style}>
      <View style={buttonStyle}>
        <View style={styles.icon}>
          <Ionicons style={{textAlign: 'center'}} name={iconName} size={moderateScale(size)} color={color} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  containedButton: {
    borderRadius: 50,
    padding: 8,
    backgroundColor: primary.s100,
  },
  fullButton: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 4,
    backgroundColor: primary.s100,
  },
  icon: {
    justifyContent: 'center',
    aspectRatio: "1 / 1",
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
