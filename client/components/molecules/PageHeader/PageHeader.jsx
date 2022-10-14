import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import TextPairing from '../../atoms/TextPairing/TextPairing';
import IconButton from '../../atoms/IconButton/IconButton'
import { neutral, primary } from '../../config/colors';

export default function PageHeader({ title, hasBackButton, hasRightButton, onRightButtonClick, style }) {
  return(
    <View style={[styles.container, style]}>
      <View style={styles.leftContainer}>
        { hasBackButton &&
        <View style={styles.backButtonContainer}>
          <IconButton
            iconName='arrow-back'
            size={40}
            color={neutral.s900}
          />
        </View>
        }
        <View style={styles.textContainer}>
          <TextPairing
            text={title}
            type='semibold'
            color='s900'
            size={32} />
        </View>
      </View>
      { hasRightButton &&
          <IconButton
            iconName='add-circle'
            size={40}
            color={primary.brand}
            onPress={onRightButtonClick} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
	leftContainer: {
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'row',
  },
  backButtonContainer: {
	  marginRight: 12,
  },
  textContainer: {
  },
});

PageHeader.defaultProps = {
    hasBackButton: false,
    hasRightButton: false,
	onRightButtonClick: () => {},
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  hasBackButton: PropTypes.bool,
  hasRightButton: PropTypes.bool,
  onRightButtonClick: PropTypes.func,
};
