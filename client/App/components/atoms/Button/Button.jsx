import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import colors from '../../config/colors';
import shadow from '../../config/base';

export default function Button({ onPress, children }) {
  return(
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container} >
          <Text style={styles.text}>{children}</Text>
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
  },
  shadow: {
    shadow,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    alignSelf: 'center',
  },
});

Button.defaultProps = {
  children: null,
  onPress: () => {},
};

Button.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
};
