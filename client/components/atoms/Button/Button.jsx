import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import colors, { neutral, others } from '../../config/colors';
import TextPairing from '../TextPairing/TextPairing';
import { Ionicons } from '@expo/vector-icons';

export default function Button({ onPress, title, type, textColor, style, iconName, iconColor }) {
  const typeStyle = [style, styles.shadow];
  switch (type) {
    case 'primary':
      typeStyle.push(styles.primaryStyle);
      break;

    case 'textInput':
      typeStyle.push(styles.textInputSytle);
      break;

    case 'contained':
      typeStyle.push(styles.containedStyle);
      break;

    default:
      typeStyle.push(styles.primaryStyle);
      break;
  }
  return(
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={[typeStyle, {flexDirection: 'row'}, style]}>
          { iconName &&
            <Ionicons style={{textAlign: 'center', marginEnd: 4}} name={iconName} size={20} color={iconColor} />
          }
          <TextPairing
            text={title}
            type='medium'
            size={16}
            color={textColor} />
        </View>
      </TouchableOpacity>
    </View>);
}

const styles = StyleSheet.create({
  primaryStyle: {
    alignSelf: 'center',
    borderRadius: 55,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.brand,
  },
  textInputSytle: {
    backgroundColor: neutral.s050,
    padding: 12,
		borderRadius: 8,
  },
  containedStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: others.danger_bg,
    paddingHorizontal: 12,
    paddingVertical: 8,
		borderRadius: 8,
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
  type: 'primary',
  textColor: 'white',
  onPress: () => {},
};

Button.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(['primary', 'textInput', 'contained']),
  onPress: PropTypes.func,
};
