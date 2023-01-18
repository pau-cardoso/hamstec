import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import TextPairing from '../../atoms/TextPairing/TextPairing';
import IconButton from '../../atoms/IconButton/IconButton'
import { neutral, primary } from '../../config/colors';
import { moderateScale } from '../../config/utils';

export default function PageHeader({ title, secondaryTitle, onPressBackButton, onRightButtonClick, rightButtonIcon, iconSize = 40, iconColor = primary.brand, style }) {
  return(
    <SafeAreaView>
      <View style={[styles.container, style]}>
        <View style={styles.leftContainer}>
          { onPressBackButton &&
          <View style={styles.backButtonContainer}>
            <IconButton
              onPress={onPressBackButton}
              iconName='arrow-back'
              size={40}
              color={neutral.s900}
            />
          </View> }
          <TextPairing
            style={{marginRight: moderateScale(16)}}
            text={title}
            type='semibold'
            color='s900'
            size={32} />
          <TextPairing
            text={secondaryTitle}
            type='medium'
            color='s400'
            size={32} />
        </View>
        { onRightButtonClick &&
            <IconButton
              iconName={rightButtonIcon}
              size={iconSize}
              color={iconColor}
              onPress={onRightButtonClick} />
        }
      </View>
    </SafeAreaView>
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
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  backButtonContainer: {
	  marginRight: moderateScale(12),
  },
});


PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onPressBackButton: PropTypes.func,
  onRightButtonClick: PropTypes.func,
  rightButtonIcon: PropTypes.string,
};
